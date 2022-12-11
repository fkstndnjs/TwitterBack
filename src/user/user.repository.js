import bcrypt from "bcrypt";
import db from "../../database.js";

let users = [
  {
    createdAt: new Date().toLocaleString(),
    id: 1,
    username: "ysh",
    password: bcrypt.hashSync("yshysh", 12),
    name: "SeokHyun Yu",
    email: "fkstndnjs@naver.com",
  },
];

export const findByUsername = async (username) => {
  return users.find((user) => user.username === username);
};

export const findById = async (id) => {
  return users.find((user) => user.id === id);
};

export const createUser = async (user) => {
  const { username, password, name, email } = user;

  db.execute(
    `INSERT INTO user(username, password, name, email) VALUES(?, ?, ?, ?)`,
    [username, password, name, email]
  ).then((data) => {
    console.log(data);
    data[0].insertId;
  });
};
