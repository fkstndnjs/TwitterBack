import { DataTypes } from "sequelize";
import sequelize from "../../database.js";
import { Tweet } from "../tweet/tweet.repository.js";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

export const findByUsername = async (username) => {
  return User.findOne({
    where: {
      username,
    },
  }).then((data) => {
    console.log(data);
    return data.dataValues;
  });
};

export const findById = async (id) => {
  return User.findByPk(id);
};

export const createUser = async (user) => {
  return User.create(user).then((data) => data.dataValues.id);
};
