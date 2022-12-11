import bcrypt from "bcrypt";
import db from "../../database.js";

    email: "fkstndnjs@naver.com",
  },
];

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
