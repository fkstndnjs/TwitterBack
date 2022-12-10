import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "twitter",
  password: "0000",
});

export default pool;
