"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_follow extends Model {
    static associate(models) {
      const { User, Activity_log } = models;

      User.hasMany(User_follow, { foreignKey: "user_id" });
      User_follow.belongsTo(User, { foreignKey: "user_id" });

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
      user_id: DataTypes.INTEGER,
      follower_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User_follow",
    }
  );
  return User_follow;
};
