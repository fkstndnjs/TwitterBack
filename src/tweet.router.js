import express from "express";

const tweetRouter = express.Router();

let tweets = [
  {
    id: "1",
    createdAt: "2022-12-01",
    name: "SeokHyun YU",
    username: "ysh",
    text: "Hello",
  },
];

tweetRouter.get("/", (req, res) => {
  const tempTweets = req.query.username
    ? tweets.filter((tweet) => tweet.username === req.query.username)
    : tweets;

  res.status(200).json(tempTweets);
});

tweetRouter.get("/:id", (req, res) => {
  const tweet = tweets.find((tweet) => tweet.id === req.params.id);

  res.status(200).json(tweet);
});

tweetRouter.post("/", (req, res) => {
  tweets = [req.body, ...tweets];

  res.status(201).json(tweets);
});

tweetRouter.put("/:id", (req, res) => {
  const { text } = req.body;
  const tweet = tweets.find((tweet) => tweet.id === req.params.id);

  tweet.text = text;

  res.status(200).json(tweet);
});

tweetRouter.delete("/:id", (req, res) => {
  tweets = tweets.filter((tweet) => tweet.id !== req.params.id);

  res.status(204);
});

export default tweetRouter;
