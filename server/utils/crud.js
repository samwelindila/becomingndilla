
import { Router } from "express";
import mongoose from "mongoose";

import { protect } from "../middleware/auth.js";
import asyncHandler from "./asyncHandler.js";
import { uniqueSlug } from "./slugify.js";

const fail = (res, status, message) => {
  res.status(status);
  throw new Error(message);
};

export default function createCrudRouter(
  Model,
  {
    slugFrom = "title",
    sort = { order: 1, createdAt: -1 },
    listSelect = "",
  } = {}
) {
  const router = Router();

  const hasSlug = Boolean(Model.schema.path("slug"));

  // PUBLIC: Get published records.
  router.get(
    "/",
    asyncHandler(async (req, res) => {
      const query = Model.find({ published: true }).sort(sort);

      if (listSelect) {
        query.select(listSelect);
      }

      const items = await query;

      res.json(items);
    })
  );

  // ADMIN: Get all records, including unpublished records.
  router.get(
    "/admin/all",
    protect,
    asyncHandler(async (req, res) => {
      const items = await Model.find().sort(sort);

      res.json(items);
    })
  );

  // PUBLIC: Get one published record by ID or slug.
  router.get(
    "/:idOrSlug",
    asyncHandler(async (req, res) => {
      const { idOrSlug } = req.params;

      let filter;

      if (mongoose.isValidObjectId(idOrSlug)) {
        filter = { _id: idOrSlug };
      } else if (hasSlug) {
        filter = { slug: idOrSlug };
      } else {
        fail(res, 404, "Record not found.");
      }

      const item = await Model.findOne({
        ...filter,
        published: true,
      });

      if (!item) {
        fail(res, 404, "Record not found.");
      }

      res.json(item);
    })
  );

  // ADMIN: Create a record.
  router.post(
    "/",
    protect,
    asyncHandler(async (req, res) => {
      const data = { ...req.body };

      delete data._id;
      delete data.__v;

      if (hasSlug) {
        const source = data.slug || data[slugFrom];

        if (!source) {
          fail(res, 400, `${slugFrom} is required.`);
        }

        data.slug = await uniqueSlug(Model, source);
      }

      const item = await Model.create(data);

      res.status(201).json(item);
    })
  );

  // ADMIN: Update a record.
  router.put(
    "/:id",
    protect,
    asyncHandler(async (req, res) => {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        fail(res, 400, "Invalid record ID.");
      }

      const data = { ...req.body };

      delete data._id;
      delete data.__v;
      delete data.createdAt;
      delete data.updatedAt;

      if (hasSlug && data.slug) {
        data.slug = await uniqueSlug(
          Model,
          data.slug,
          id
        );
      } else {
        delete data.slug;
      }

      const item = await Model.findByIdAndUpdate(
        id,
        { $set: data },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!item) {
        fail(res, 404, "Record not found.");
      }

      res.json(item);
    })
  );

  // ADMIN: Delete a record.
  router.delete(
    "/:id",
    protect,
    asyncHandler(async (req, res) => {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        fail(res, 400, "Invalid record ID.");
      }

      const item = await Model.findByIdAndDelete(id);

      if (!item) {
        fail(res, 404, "Record not found.");
      }

      res.json({
        success: true,
        message: "Record deleted successfully.",
      });
    })
  );

  return router;
}
