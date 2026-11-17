import { Router } from "express";
import createCrudRouter from "../utils/crud.js";
import Project from "../models/Project.js";
import Post from "../models/Post.js";
import Venture from "../models/Venture.js";
import Service from "../models/Service.js";
import Product from "../models/Product.js";
import Testimonial from "../models/Testimonial.js";
import PortfolioItem from "../models/PortfolioItem.js";

const router = Router();

router.use("/projects", createCrudRouter(Project));
router.use("/posts", createCrudRouter(Post, { sort: { date: -1 }, listSelect: "-content" }));
router.use("/ventures", createCrudRouter(Venture, { slugFrom: "name" }));
router.use("/services", createCrudRouter(Service));
router.use("/products", createCrudRouter(Product));
router.use("/testimonials", createCrudRouter(Testimonial));
router.use("/portfolio", createCrudRouter(PortfolioItem));

export default router;