import * as tweetRepository from "../data/tweet.data.js";

// 전체 조회
export const getTweets = async (req, res) => {
    const { username } = req.query;
    const tempTweets = username
        ? tweetRepository.getAllTweetsByUsername(username)
        : tweetRepository.getAllTweets();

    res.status(200).json(tempTweets);
};

// 상세 조회
export const getTweet = async (req, res) => {
    const { id } = req.params;
    const tweet = tweetRepository.getTweetById(id);

    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({ status: 404, message: `id ${id} NOT FOUND` });
    }
};

// 트윗 생성
export const createTweet = async (req, res) => {
    tweetRepository.createTweet(req.body);

    res.sendStatus(201);
};

// 트윗 수정
export const updateTweet = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const tweet = tweetRepository.updateTweet(id, text);

    if (tweet) {
        tweet.text = text;

        res.status(200).json(tweet);
    } else {
        res.status(404).json({ status: 404, message: `id ${id} NOT FOUND` });
    }
};

// 트윗 삭제
export const deleteTweet = async (req, res) => {
    const { id } = req.params;
    const deleteResult = tweetRepository.deleteTweet(id);

    if (deleteResult) {
        res.sendStatus(204);
    } else {
        res.status(404).json({ status: 404, message: `id ${id} NOT FOUND` });
    }
};
