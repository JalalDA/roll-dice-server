import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

const Games = db.define("games", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  total_round: {
    type: DataTypes.INTEGER,
  },
  total_player: {
    type: DataTypes.INTEGER,
  },
  result: {
    type: DataTypes.JSON,
  },
});

export default Games;
