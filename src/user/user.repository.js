import { DataTypes } from "sequelize";
import sequelize from "../../database";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

export const findByUsername = async (username) => {
  return db
    .execute("SELECT * FROM user WHERE username=?", [username])
    .then((data) => data[0][0]);
};

export const findById = async (id) => {
  return db
    .execute("SELECT * FROM user WHERE id=?", [id])
    .then((data) => data[0][0]);
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
