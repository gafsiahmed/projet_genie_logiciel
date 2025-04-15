import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

// Function to create an access token with a given user ID and email
export const createAccessToken = (user: IUser): string => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: process.env.ACCESS_TOKEN_DURATION }
  );
};

// Function to create a refresh token with a given user ID and email
export const createRefreshToken = (user: IUser): string => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: process.env.REFRESH_TOKEN_DURATION }
  );
};
