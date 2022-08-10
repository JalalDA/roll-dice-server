import { Sequelize } from "sequelize";

export const db = new Sequelize("roll_dice", "root", "009", {
  host: "localhost",
  dialect: "mysql",
});
