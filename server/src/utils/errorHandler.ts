import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(401).json({ errorMessage: err.message });
};

export { errorHandler };
