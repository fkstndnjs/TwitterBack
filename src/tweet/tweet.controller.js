import express from "express";
import * as tweetService from "./tweet.service.js";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";

const tweetController = express.Router();

// 전체 조회
tweetController.get("/", tweetService.getTweets);

// 상세 조회
tweetController.get("/:id", tweetService.getTweet);

// 트윗 생성
tweetController.post(
  "/",
  body("text")
    .trim()
    .isLength({ min: 3 })
    .withMessage("최소 글자 이상 입력해주세요."),
  validate,
  tweetService.createTweet
);

// 트윗 수정
tweetController.put("/:id", tweetService.updateTweet);

// 트윗 삭제
tweetController.delete("/:id", tweetService.deleteTweet);

export default tweetController;
