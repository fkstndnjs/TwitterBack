import mysql from "mysql2";
import sequel from "sequelize";

const sequelize = new sequel.Sequelize("twitter", "root", "0000", {
  host: "127.0.0.1",
});

// const pool = mysql.createPool({
//   host: "127.0.0.1",
//   user: "root",
//   database: "twitter",
//   password: "0000",
// });

// const db = pool.promise();

// export default db;
