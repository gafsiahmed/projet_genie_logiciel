import { NextFunction, Request, Response } from "express";
import ForgetPassword from "../models/ForgetPassword";

export const verifyChangePasswordToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.params;
  try {
    const validUser = await ForgetPassword.findOne(token);
    if (!validUser) {
      return res.status(400).send({ message: "invalid operation " });
    }
    // res.status(200).send({ message: "you are good to go" });
    return next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
  next();
};
