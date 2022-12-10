import mysql from "mysql2";

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  database: "twitter",
  password: "0000",
});

const db = pool.promise();

export default db;
