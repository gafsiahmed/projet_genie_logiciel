import dotenv from "dotenv";

const envPath = __dirname.indexOf("config") ? "../../.env" : "../env";
dotenv.config({ path: envPath });

export default {
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenExpiration: process.env.ACCESS_TOKEN_DURATION,
    refreshTokenExpiration: process.env.REFRESH_TOKEN_DURATION,
  },
};
