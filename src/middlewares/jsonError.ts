import type { ErrorRequestHandler } from "express";

export const jsonErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({
      error: "Invalid JSON",
      code: "BAD_JSON"
    });
  }

  next(error);
};