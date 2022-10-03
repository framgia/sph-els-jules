"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_follow extends Model {
    static associate(models) {
      const { Activity_log } = models;

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
    }
  }
  User_follow.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: DataTypes.INTEGER,
      follower_id: DataTypes.INTEGER,
      is_followed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User_follow",
    }
  );
  return User_follow;
};
