import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bycrypt from "bcryptjs";

export const checkUserDoesNotExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  next();
};

export const checkCredentials = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    const existingUser : any = await User.findOne({ email });
    if (!existingUser) {
        return res.status(400).json({ message: "Invalid Credentials" });
        }

    const isMatch = await bycrypt.compare(password, existingUser.password.toString() );
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
        }

    Object.assign(req.body, { user: existingUser });
    next();

  }
