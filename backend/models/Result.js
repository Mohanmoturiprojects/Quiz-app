import { DataTypes } from 'sequelize'
import sequelize from "../config/db.js";

const Result = sequelize.define(
  'Result',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answerCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalQ: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    correctAns: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    percentage: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    tableName: 'results',
    timestamps: true
  }
)

export default Result