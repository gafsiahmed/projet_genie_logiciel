import dotenv from "dotenv";
import { Request, Response } from "express";
import path from "path";
import { AccessTokenFactory, RefreshTokenFactory } from "../../domain/factories/TokenFactory";
import Token from "../../models/Tokens";
import { IUser } from "../../models/User";
import { deleteRefreshToken, verifyRefreshToken } from "../../services/tokens.service";
import { getUser } from "../../services/user.services";

const envFilePath = path.join(__dirname, "../../.env");
dotenv.config({ path: envFilePath });

export class AuthController {
  private accessTokenFactory: AccessTokenFactory;
  private refreshTokenFactory: RefreshTokenFactory;

  constructor() {
    this.accessTokenFactory = new AccessTokenFactory();
    this.refreshTokenFactory = new RefreshTokenFactory();
  }

  async login(req: Request, res: Response) {
    const user = req.body.user;
    try {
      // Use factory method pattern for token creation
      const accesstoken = this.accessTokenFactory.getToken(user);
      const refreshtoken = await this.refreshTokenFactory.getToken(user);

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(200).json({ accesstoken, role: user.role });
    } catch (error) {
      res.status(500).json({ error, msg: "login failed" });
    }
  }

  async getLoggedUser(req: Request, res: Response) {
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
  }

  async logout(req: Request, res: Response) {
    const cookies = req.cookies;
    const token = cookies.refreshtoken;

    if (!cookies.refreshtoken) {
      return res.status(204).json({
        msg: "no token provided",
      });
    }
    try {
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
      return res.status(204).send();
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async handleRefreshToken(req: Request, res: Response) {
    const cookies = req.cookies;

    if (!cookies.refreshtoken) {
      return res.status(401).json({
        msg: "No refreshtoken provided please checkout your input data",
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
      
      // Use factory method pattern for token creation
      const accesstoken = this.accessTokenFactory.getToken(user);

      return res.status(200).json({ accesstoken });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}