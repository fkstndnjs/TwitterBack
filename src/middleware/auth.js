import jwt from "jsonwebtoken";
import * as userRepository from "../user/user.repository.js";

export const auth = async (req, res, next) => {
    const authHeader = req.get("Authorization");

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, "secret", async (err, data) => {
            if (err) {
                return res.status(401).json({ message: "인증 에러" });
            } else {
                const user = await userRepository.findById(data.id);

                if (user) {
                    req.token = token;
                    req.userId = user.id;

                    return next();
                } else {
                    return res.status(401).json({ message: "인증 에러" });
                }
            }
        });
    } else {
        // else로 안묶어 주면 위의 if 문에서는 return 문이 없어서 이 부분까지 실행됨
        // jwt.verify()의 콜백에서 return을 하긴 하지만 비동기라서 이 부분까지 실행되고 실행이 되서 에러 발생
        return res.status(401).json({ message: "인증 에러" });
    }
};
