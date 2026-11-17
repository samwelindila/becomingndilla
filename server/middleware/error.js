export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not found: ${req.originalUrl}`));
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || "Server error";

  if (err.name === "ValidationError") {
    status = 400;
    message = Object.values(err.errors).map((e) => e.message).join(", ");
  }
  if (err.code === 11000) {
    status = 409;
    message = "That value already exists";
  }

  if (status === 500) console.error(err);

    if (err.name === "MulterError") {
    status = 400;
    message = err.code === "LIMIT_FILE_SIZE" ? "Image is too large (max 5 MB)" : err.message;
  }

  res.status(status).json({
    message: status === 500 && process.env.NODE_ENV === "production" ? "Server error" : message,
  });
};