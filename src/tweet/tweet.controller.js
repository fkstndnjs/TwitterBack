import express from "express";
import * as tweetController from "./tweet.service.js";

const tweetRouter = express.Router();

// 전체 조회
tweetRouter.get("/", tweetController.getTweets);

// 상세 조회
tweetRouter.get("/:id", tweetController.getTweet);

// 트윗 생성
tweetRouter.post("/", tweetController.createTweet);

// 트윗 수정
tweetRouter.put("/:id", tweetController.updateTweet);

// 트윗 삭제
tweetRouter.delete("/:id", tweetController.deleteTweet);

export default tweetRouter;
