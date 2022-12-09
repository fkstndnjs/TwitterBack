import dotenv from "dotenv";

// process.env 세팅
dotenv.config();

export const config = {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    jwtExpires: process.env.JWT_EXPIRES,
    bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
};
