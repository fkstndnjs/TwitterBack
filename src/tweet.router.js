import express from "express";

const tweetRouter = express.Router();

const tweets = [
  {
    id: "1",
    createdAt: "2022-12-05",
    name: "SeokHyun YU",
    username: "ysh",
  },
];

tweetRouter.get("/", (req, res) => {
  res.status(200).json(tweets);
});

tweetRouter.post("/", (req, res) => {
  res.send("POST");
});

tweetRouter.put("/:id", (req, res) => {
  res.send("PUT");
});

tweetRouter.delete("/:id", (req, res) => {
  res.send("DELETE");
});

export default tweetRouter;
