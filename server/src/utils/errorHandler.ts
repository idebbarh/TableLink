import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ErrorMessage } from "express-validator/src/base";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(401).json({ err: err.message });
};

export { errorHandler };
