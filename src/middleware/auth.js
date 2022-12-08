import jwt from "jsonwebtoken";
import * as userRepository from "../user/user.repository.js";

export const auth = async (req, res, next) => {
    // Header의 Authorization 키 안에 담겨있는 토큰을 가져온다
    const authHeader = req.get("Authorization");

    // 토큰이 있고 "Bearer"로 시작하는 토큰이라면
    if (authHeader && authHeader.startsWith("Bearer ")) {
        // "Bearer"와 토큰 string을 분리
        const token = authHeader.split(" ")[1];

        // 토큰값 검증
        jwt.verify(token, "secret", async (err, data) => {
            // 토큰이 유효하지 않다면
            if (err) {
                return res.status(401).json({ message: "인증 에러" });
            }
            // 토큰이 유효하다면
            else {
                // 토큰이 유효하더라도 토큰에 담겨있는 id값이 실제로 존재하는지 한 번 더 확인
                const user = await userRepository.findById(data.id);

                // 유저가 존재하면
                if (user) {
                    req.token = token;
                    req.userId = user.id;

                    return next();
                }
                // 유저가 존재하지 않다면
                else {
                    return res.status(401).json({ message: "인증 에러" });
                }
            }
        });
    }
    // 위의 if 문에는 return 문이 없다
    // jwt.verify의 콜백 함수 안에서 return을 하긴 하지만 비동기로 동작한다
    // 따라서 else로 묶어주지 않으면 아래의 return 문까지 실행된다
    else {
        return res.status(401).json({ message: "인증 에러" });
    }
};
