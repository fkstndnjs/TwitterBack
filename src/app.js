import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import tweetController from "./tweet/tweet.controller.js";
import authController from "./auth/auth.controller.js";
import { config } from "../config.js";
import sequelize from "../database.js";
import mysql from "mysql2";

// 서버 생성
const app = express();

// 미들웨어
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

// 라우터
app.use("/tweet", tweetController);
app.use("/auth", authController);

// 404 에러 핸들러
app.use((req, res, next) => {
    res.sendStatus(404);
});

// 500 에러 핸들러
app.use((err, req, res, next) => {
    res.sendStatus(500);
});

// DB 연결
sequelize.sync().then(() => {
    // 8000 포트로 listen
    // DB가 연결된 다음에 서버 실행
    app.listen(config.port, () => {
        console.log("Server On...");
    });
});
