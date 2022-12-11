import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const User = sequelize.define("user", {
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
  });
};

export const findById = async (id) => {
  return User.findByPk(id);
};

export const createUser = async (user) => {
  const { username, password, name, email } = user;

  return db
    .execute(
      `INSERT INTO user(username, password, name, email) VALUES(?, ?, ?, ?)`,
      [username, password, name, email]
    )
    .then((data) => {
      return data[0].insertId;
    });
};
