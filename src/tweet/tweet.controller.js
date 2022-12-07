import express from "express";
import * as tweetService from "./tweet.service.js";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";

const tweetController = express.Router();
const textValidator = [
  body("text")
    .trim()
    .isLength({ min: 5 })
    .withMessage("text를 최소 5 글자 이상 입력해주세요."),
  validate,
];

// 전체 조회
tweetController.get("/", tweetService.getTweets);

// 상세 조회
tweetController.get("/:id", tweetService.getTweet);

// 트윗 생성
tweetController.post("/", textValidator, tweetService.createTweet);

// 트윗 수정
tweetController.put("/:id", textValidator, tweetService.updateTweet);

// 트윗 삭제
tweetController.delete("/:id", tweetService.deleteTweet);

export default tweetController;
