// import { ObjectId } from "mongodb";
// import Token from "../models/Tokens";
// import {
//   ACCESS_TOKEN_DURATION,
//   REFRESH_TOKEN_DURATION,
// } from "../utils/constants";

// export const saveAccessToken = async (id: ObjectId, token: string) => {
//   const expires = new Date();
//   expires.setTime(expires.getTime() + ACCESS_TOKEN_DURATION);
//   const newToken = new Token({
//     user: id,
//     token,
//     type: "access",
//     expires,
//   });
//   return newToken.save();
// };
// export const saveRefreshToken = async (id: ObjectId, token: string) => {
//   const expires = new Date();
//   expires.setTime(expires.getTime() + REFRESH_TOKEN_DURATION);
//   const newToken = new Token({
//     user: id,
//     token,
//     type: "refresh",
//     expires,
//   });
//   return newToken.save();
// };
