import { Sequelize } from "sequelize";

const sequelize = new Sequelize("project", "root", "Mohan", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;