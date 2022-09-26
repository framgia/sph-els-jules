"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      const { User_follow, Activity_log, Result } = models;

      User.belongsToMany(User, {
        as: "Follower",
        through: User_follow,
        foreignKey: "user_id",
      });
      User.belongsToMany(User, {
        as: "Following",
        through: User_follow,
        foreignKey: "user_id",
      });

      User.hasMany(User_follow, { foreignKey: "user_id" });
      User_follow.belongsTo(User, { foreignKey: "user_id" });

      User.hasMany(Result);
      Result.belongsTo(User);

      User.hasMany(Activity_log, { foreignKey: "user_id" });
      Activity_log.belongsTo(User, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      user_type: DataTypes.STRING,
      avatar_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
