import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import path from "path";

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader: string | undefined = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const splittedAuthToken = authHeader.split("Bearer ");
  if (splittedAuthToken.length !== 2) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const token = splittedAuthToken[1];

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }
  try {
    const payload = jwt.verify(token, config.jwt.accessTokenSecret as string);
    if (!payload) {
      return res.status(401).json({ message: "Invalid token" });
    }

    Object.assign(req.body, { authPayload: payload });
  } catch (e) {
    return res
      .status(401)
      .json({ message: "Invalid/expired token , please login" });
  }

  return next();
};

export const accessByRole =
  (roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({
          message:
            "Access denied. No token provided. Please login to get a token",
        });
    }
    try {
      const payload: any = jwt.verify(
        token,
        config.jwt.accessTokenSecret as string
      );
      if (!payload) {
        return res.status(401).json({ message: "Invalid token" });
      }
      if (roles.includes(payload.role)) {
        return next();
      }
      return res.status(401).json({ message: "Unauthorized" });
    } catch (e) {
      return res.status(401).json({ message: "Invalid/expired token" });
    }
  };
