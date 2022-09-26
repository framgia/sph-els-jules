"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Activity_log extends Model {
    static associate(models) {
      const { User, User_follow, Result } = models;

      User.hasMany(Activity_log, { foreignKey: "user_id" });
      Activity_log.belongsTo(User, { foreignKey: "user_id" });

      User_follow.hasMany(Activity_log, {
        foreignKey: "relatable_id",
        constraints: false,
        scope: {
          relatable_type: "follow",
        },
      });
      Activity_log.belongsTo(User_follow, {
        foreignKey: "relatable_id",
        constraints: false,
      });

      Result.hasMany(Activity_log, {
        foreignKey: "relatable_id",
        constraints: false,
        scope: {
          relatable_type: "result",
        },
      });
      Activity_log.belongsTo(Result, {
        foreignKey: "relatable_id",
        constraints: false,
      });
    }
  }
  Activity_log.init(
    {
      user_id: DataTypes.INTEGER,
      relatable_id: DataTypes.INTEGER,
      relatable_type: DataTypes.STRING,
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Activity_log",
    }
  );
  return Activity_log;
};
