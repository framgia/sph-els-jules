"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      const { User_follow, Activity_log, Result } = models;

      User.hasMany(User_follow, { foreignKey: "follower_id", as: "Follower" });
      User_follow.belongsTo(User, {
        foreignKey: "follower_id",
        as: "Follower",
      });
      User.hasMany(User_follow, { foreignKey: "user_id", as: "Following" });
      User_follow.belongsTo(User, { foreignKey: "user_id", as: "Following" });

      User.hasMany(Result, { foreignKey: "user_id" });
      Result.belongsTo(User, { foreignKey: "user_id" });

      User.hasMany(Activity_log, { foreignKey: "user_id" });
      Activity_log.belongsTo(User, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
