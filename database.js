import { Sequelize } from "sequelize";

const sequelize = new Sequelize("twitter", "root", "0000", {
  host: "127.0.0.1",
  dialect: "mysql",
});

export default sequelize;
