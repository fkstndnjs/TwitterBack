import jwt from "jsonwebtoken";
import * as userRepository from "../user/user.repository.js";

export const auth = async (req, res, next) => {
    const authHeader = req.get("Authorization");

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, "secret");
    }
};
