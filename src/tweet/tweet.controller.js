import express from "express";
import * as tweetService from "./tweet.service.js";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import { auth } from "../middleware/auth.js";

const tweetController = express.Router();

// text가 5글자 이상인지 검사하는 validator
const textValidator = [
    body("text")
        .trim()
        .isLength({ min: 5 })
        .withMessage("text를 최소 5 글자 이상 입력해주세요."),
    validate,
];

// 전체 조회
tweetController.get("/", auth, tweetService.getTweets);

// 상세 조회
tweetController.get("/:id", auth, tweetService.getTweet);

// 트윗 생성
// textValidator 미들웨어 추가
tweetController.post("/", auth, textValidator, tweetService.createTweet);

// 트윗 수정
// textValidator 미들웨어 추가
tweetController.put("/:id", auth, textValidator, tweetService.updateTweet);

// 트윗 삭제
tweetController.delete("/:id", auth, tweetService.deleteTweet);

export default tweetController;
