export interface IToken {
  token: string;
  userId: string;
  expiresAt: Date;
}

export interface ITokenPayload {
  id: string;
  email: string;
  role: string;
}