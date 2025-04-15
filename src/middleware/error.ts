import BaseError from "config/baseError";
import express, { Request, Response, NextFunction } from "express";

export default (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode, message, errorPayload } = err;
  const response = {
    code: statusCode,
    message,
    error: errorPayload,
  };

  res.status(statusCode).json(response);
};
