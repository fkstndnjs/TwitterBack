import express from "express";
import * as tweetService from "./tweet.service.js";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import { auth } from "../middleware/auth.js";

const tweetController = express.Router();

const textValidator = [
  body("text")
    .trim()
    .isLength({ min: 5 })
    .withMessage("text를 최소 5 글자 이상 입력해주세요."),
  validate,
];

// 전체 조회
/**
 * @swagger
 *
 * /tweet:
 *   get:
 *     tags:
 *      - Tweet
 *     summary: tweet 전체 조회
 *     description: tweet을 배열 형태로 return 한다
 *     responses:
 *       200:
 *         description: An array of tweets
 */
tweetController.get("/", auth, tweetService.getTweets);

// 상세 조회
tweetController.get("/:id", auth, tweetService.getTweet);

// 트윗 생성
tweetController.post("/", auth, textValidator, tweetService.createTweet);

// 트윗 수정
tweetController.put("/:id", auth, textValidator, tweetService.updateTweet);

// 트윗 삭제
tweetController.delete("/:id", auth, tweetService.deleteTweet);

export default tweetController;
