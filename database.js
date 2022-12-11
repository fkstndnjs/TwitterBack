import sequel from "sequelize";

const sequelize = new sequel.Sequelize("twitter", "root", "0000", {
  host: "127.0.0.1",
  dialect: "mysql",
});

export default sequelize;
