import express from "express";

const tweetRouter = express.Router();

tweetRouter.get("/", (req, res) => {
  res.send("GET");
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
