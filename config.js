import dotenv from "dotenv";

// process.env 세팅
dotenv.config();

export const config = {
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpires: process.env.JWT_EXPIRES,
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS),
  port: parseInt(process.env.SERVER_PORT),
};
