import sequelize from "../../database.js";
import * as userRepository from "../user/user.repository.js";
import { DataTypes } from "sequelize";

export const Tweet = sequelize.define("tweet", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
Tweet.belongsTo(userRepository.User);

export const getAllTweets = async () => {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name } = await userRepository.findById(tweet.userId);

      return { ...tweet, username, name };
    })
  );
};

export const getAllTweetsByUsername = async (username) => {
  return getAllTweets().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
};

export const getTweetById = async (id) => {
  const tweet = tweets.find((tweet) => `${tweet.id}` === id);
  const { username, name } = userRepository.findById(tweet.userId);

  return { ...tweet, username, name };
};

export const createTweet = async (text, userId) => {
  const newTweet = {
    id: (tweets[0]?.id || 0) + 1,
    createdAt: Date.now().toLocaleString(),
    text,
    userId,
  };

  tweets = [newTweet, ...tweets];

  return newTweet;
};

export const updateTweet = async (id, text) => {
  const tweet = tweets.find((tweet) => `${tweet.id}` === id);

  if (tweet) {
    tweet.text = text;
  }

  return tweet;
};

export const deleteTweet = async (id) => {
  tweets = tweets.filter((tweet) => `${tweet.id}` !== id);
};
