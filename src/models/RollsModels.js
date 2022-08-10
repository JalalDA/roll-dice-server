import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

const Rolls = db.define("rolls", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  round_id: {
    type: DataTypes.INTEGER,
  },
  player_id: {
    type: DataTypes.INTEGER,
  },
  dice_value: {
    type: DataTypes.INTEGER,
  },
});

export default Rolls;
