import jwt from "jsonwebtoken";
import { IUser } from "../../models/User";
import Token from "../../models/Tokens";

// Abstract Product
export interface IToken {
  generate(user: IUser): string | Promise<string>;
}

// Concrete Products
export class AccessToken implements IToken {
  generate(user: IUser): string {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };
    
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: "15m"
    });
  }
}

export class RefreshToken implements IToken {
  async generate(user: IUser): Promise<string> {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };
    
    const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: "7d"
    });
    
    // Save token to database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    
    const newToken = new Token({
      user: user.id,
      token,
      type: "refresh",
      expires: expiresAt
    });
    
    await newToken.save();
    return token;
  }
}

// Abstract Creator
export abstract class TokenFactory {
  abstract createToken(): IToken;
  
  getToken(user: IUser): Promise<string> | string {
    const token = this.createToken();
    return token.generate(user);
  }
}

// Concrete Creators
export class AccessTokenFactory extends TokenFactory {
  createToken(): IToken {
    return new AccessToken();
  }
}

export class RefreshTokenFactory extends TokenFactory {
  createToken(): IToken {
    return new RefreshToken();
  }
}