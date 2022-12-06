import express from "express";
import * as tweetRepository from "../data/tweet.data.js";

const tweetRouter = express.Router();

// 전체 조회
tweetRouter.get("/", (req, res) => {
    const tempTweets = req.query.username
        ? tweetRepository.getAllTweetsByUsername(req.query.username)
        : tweetRepository.getAllTweets();

    res.status(200).json(tempTweets);
});

// 상세 조회
tweetRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const tweet = tweets.find((tweet) => tweet.id === id);

    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({ status: 404, message: `id ${id} NOT FOUND` });
    }
});

// 트윗 생성
tweetRouter.post("/", (req, res) => {
    tweets = [req.body, ...tweets];

    res.status(201).json(tweets);
});

// 트윗 수정
tweetRouter.put("/:id", (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const tweet = tweets.find((tweet) => tweet.id === id);

    if (tweet) {
        tweet.text = text;

        res.status(200).json(tweet);
    } else {
        res.status(404).json({ status: 404, message: `id ${id} NOT FOUND` });
    }
});

// 트윗 삭제
tweetRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const prevLength = tweets.length;
    tweets = tweets.filter((tweet) => tweet.id !== id);

    if (prevLength !== tweets.length) {
        res.sendStatus(204);
    } else {
        res.status(404).json({ status: 404, message: `id ${id} NOT FOUND` });
    }
});

export default tweetRouter;
