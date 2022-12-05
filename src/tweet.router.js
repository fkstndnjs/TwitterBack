import express from "express";

const tweetRouter = express.Router();

let tweets = [
  {
    id: "1",
    createdAt: "2022-12-05",
    name: "SeokHyun YU",
    username: "ysh",
    text: "Hello",
  },
];

tweetRouter.get("/", (req, res) => {
  res.status(200).json(tweets);
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
