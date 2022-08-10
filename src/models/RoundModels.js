import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

const Rounds = db.define("rounds", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  game_id: {
    type: DataTypes.STRING,
  },
  player_info: {
    type: DataTypes.JSON,
  },
});

export default Rounds;
