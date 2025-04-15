import dotenv from "dotenv";
import { Request, Response } from "express";
import path from "path";
import {
  createAccessToken,
  createRefreshToken,
  deleteExpiredRefreshTokens,
  deleteRefreshToken,
  verifyRefreshToken,
} from "../services/tokens.service";
import {} from "./../middleware/generateToken";
import { IUser } from "./../models/User";
import {} from "./../services/tokens.service";
import { getUser } from "./../services/user.services";
import Token from "../models/Tokens";

const envFilePath = path.join(__dirname, "../../.env");
dotenv.config({ path: envFilePath });

// Creating the login controller✅
//---------------------------------------------------------------------------------
export const login = async (req: Request, res: Response) => {
  const user = req.body.user;
  try {
    const accesstoken = createAccessToken(user);
    const refreshtoken = await createRefreshToken(user);

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({ accesstoken, role: user.role });
  } catch (error) {
    res.status(500).json({ error, msg: "login failed" });
  }
};
//---------------------------------------------------------------------------------
//get logged user ✅
export const getLoggedUser = async (req: Request, res: Response) => {
  try {
    const user = await getUser(req.body.authPayload.id);

    res.status(200).json({
      id: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      role: user?.role,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
//---------------------------------------------------------------------------------
// creating the logout route done ✅

export const logout = async (req: Request, res: Response) => {
  //on client , also delete the accesstoken in the memory of the app or delete from th e cookie
  const cookies = req.cookies;
  const token = cookies.refreshtoken;
  //console.log(token);

  if (!cookies.refreshtoken) {
    return res.status(204).json({
      msg: "to token provided",
    });
  }
  try {
    //get the user id from the cookies.refreshtoken and serach in Token collection if there is a token in th database with same id and if exist deletet it else handle the error
    const decoded = await verifyRefreshToken(token);
    const userId = decoded.id;
    const getuser = await Token.findOne({ user: userId });
    if (getuser) {
      res.clearCookie("refreshtoken", {
        httpOnly: true,
      });
      deleteRefreshToken(userId, token);
      return res.status(200).json({
        msg: "logout: success",
      });
    }
    return res.status(204);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// createing a controller to handle refreshing the accesstoken  done ✅
//---------------------------------------------------------------------------------
export const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  //console.log(cookies.refreshtoken);

  if (!cookies.refreshtoken) {
    return res.status(401).json({
      msg: "No reffreshtoken provided please checkout your inptut data",
    });
  }
  try {
    const decoded = await verifyRefreshToken(cookies.refreshtoken);
    const userId = decoded.id;
    const getuser = await getUser(userId);
    let user = {
      id: getuser?._id,
      email: getuser?.email,
      role: getuser?.role,
      firstName: getuser?.firstName,
      lastName: getuser?.lastName,
      phoneNumber: getuser?.phoneNumber,
    } as IUser;
    const accesstoken = createAccessToken(user);

    return res.status(200).json({ accesstoken });
  } catch (error) {
    res.status(500).json({ error });
  }
};

//---------------------------------------------------------------------------------
//old code of the refresh the accessToken above

// const refreshToken = req.body.refreshtoken;
//   if (!refreshToken) {
//     return res.status(401).json({
//       msg: "No reffreshtoken provided please checkout your inptut data",
//     });
//   }

//   try {
//     const decoded = await verifyRefreshToken(refreshToken);
//     const userId = decoded.id;
//     const getuser = await getUser(userId);
//     let user = {
//       id: getuser?._id,
//       email: getuser?.email,
//       role: getuser?.role,
//       firstName: getuser?.firstName,
//       lastName: getuser?.lastName,
//       phoneNumber: getuser?.phoneNumber,
//     } as IUser;
//     const accesstoken = createAccessToken(user);
//     return res.status(200).json({ accesstoken });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
