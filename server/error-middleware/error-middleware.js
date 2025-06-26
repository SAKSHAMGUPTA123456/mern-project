const { ZodError } = require("zod");

const errorMiddleware = (err, req, res, next) => {
  let statusCode = res.statusCode !== 200 ? res.statusCode : 400;

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const formattedErrors = {};
    err.errors.forEach((e) => {
      const field = e.path[0]; // "username", "email", etc.
      formattedErrors[field] = e.message;
    });

    return res.status(statusCode).json({ error: formattedErrors });
  }

  // Handle manual or unknown errors
  const key = err.key || "message";
  const message = err.message || "Something went wrong";

  return res.status(statusCode).json({
    error: {
      [key]: message,
    },
  });
};

module.exports = errorMiddleware;
