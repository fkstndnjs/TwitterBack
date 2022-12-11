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
  return Tweet.findAll({
    attributes: ["id", "text", "createdAt"],
    include: {
      model: userRepository.User,
      attributes: ["id", "username"],
    },
    order: [["createdAt", "DESC"]],
  });
};

export const getAllTweetsByUsername = async (username) => {
  return Tweet.findAll({
    attributes: ["id", "text", "createdAt"],
    include: {
      model: userRepository.User,
      attributes: ["id", "username"],
      where: {
        username,
      },
    },
    order: [["createdAt", "DESC"]],
  });
};

export const getTweetById = async (id) => {
  return Tweet.findAll({
    attributes: ["id", "text", "createdAt"],
    include: {
      model: userRepository.User,
      attributes: ["id", "username"],
      where: {
        id,
      },
    },
    order: [["createdAt", "DESC"]],
  });
};

export const createTweet = async (text, userId) => {
  return Tweet.create({ text, userId }).then((data) => data.dataValues);
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
