import jwt from "jsonwebtoken";
import * as userRepository from "../user/user.repository.js";

export const auth = async (req, res, next) => {
    const authHeader = req.get("Authorization");

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, "secret", (err, data) => {
            if (err) {
                return res.status(401).json({ message: "인증 에러" });
            }

            const user = userRepository.findById(data.id);

            if (user) {
                req.token = token;
                req.userId = user.id;

                return next();
            }

            return res.status(401).json({ message: "인증 에러" });
        });
    }
};
