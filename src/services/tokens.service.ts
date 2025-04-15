import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import config from "../config/config";
import Token from "../models/Tokens";
import { IUser } from "../models/User";

// Function to create an access token with a given user ID and email
export const createAccessToken = (user: IUser): string => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, config.jwt.accessTokenSecret as string, {
    expiresIn: Number(config.jwt.accessTokenExpiration),
  });

  //saveAccessToken(user.id, token);

  return token;
};

// Function to create a refresh token with a given user ID and email
export const createRefreshToken = async (user: IUser) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, config.jwt.refreshTokenSecret as string, {
    expiresIn: Number(config.jwt.refreshTokenExpiration),
  });
  const oldRefreshToken = await Token.findOne({
    user: user.id,
    type: "refresh",
  });
  if (oldRefreshToken) {
    await Token.deleteOne({ user: user.id, type: "refresh" });
  }

  await saveRefreshToken(user.id, token);

  return token;
};

// export const saveAccessToken = async (id: ObjectId | string, token: string) => {
//   const expires = new Date(
//     Date.now() + Number(config.jwt.accessTokenExpiration) * 1000
//   );
//   const newToken = new Token({
//     user: id,
//     token,
//     type: "access",
//     expires,
//   });
//   return newToken.save();
// };
export const saveRefreshToken = async (
  id: ObjectId | string,
  token: string
) => {
  const expires = new Date(
    Date.now() + Number(config.jwt.refreshTokenExpiration) * 1000
  );
  const newToken = new Token({
    user: id,
    token,
    type: "refresh",
    expires,
  });
  newToken.save();
};

export const deleteExpiredRefreshTokens = async () => {
  const expiredTokens = await Token.find({
    type: "refresh",
    expires: { $lt: new Date() },
  });
  await Token.deleteMany({
    _id: { $in: expiredTokens.map((token) => token._id) },
  });
};

export const deleteRefreshToken = async (id: string, token: string) => {
  const deletedtoken = await Token.findOneAndDelete({
    user: id,
    token,
    type: "refresh",
  });
  return deletedtoken;
};

export const verifyRefreshToken = (token: string) => {
  try {
    const payload = jwt.verify(
      token,
      config.jwt.refreshTokenSecret as string
    ) as any;
    return payload;
  } catch (error) {
    return null;
  }
};
