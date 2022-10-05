"use strict";

const bcrypt = require("bcrypt");
const { Model } = require("sequelize");

const ResponseHelper = require("../helpers/response");

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

  User.validateUser = async (id, email, current_password, res) => {
    const user = await User.findByPk(id);
    if (!user) {
      res.send(ResponseHelper.generateNotFoundResponse("User"));
      return;
    }

    if (email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        res.send(
          ResponseHelper.generateResponse(404, "Email is already in use")
        );
        return;
      }
    }

    if (current_password) {
      const passwordIsCorrect = await bcrypt.compare(
        current_password,
        user.password
      );
      if (!passwordIsCorrect) {
        res.send(
          ResponseHelper.generateResponse(404, "Password is incorrect!")
        );
        return;
      }
    }
    return user;
  };

  return User;
};
