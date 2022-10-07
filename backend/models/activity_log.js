"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Activity_log extends Model {
    static associate(models) {
      const { User, User_follow, Lesson } = models;

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

      Lesson.hasMany(Activity_log, {
        foreignKey: "relatable_id",
        constraints: false,
        scope: {
          relatable_type: "lesson",
        },
      });
      Activity_log.belongsTo(Lesson, {
        foreignKey: "relatable_id",
        constraints: false,
      });
    }
  }

  Activity_log.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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

  Activity_log.addHook("afterFind", (findResult) => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (!instance) return;
      if (
        instance.relatable_type === "follow" ||
        instance.relatable_type === "unfollow"
      ) {
        delete instance.Lesson;
        delete instance.dataValues.Lesson;
      } else if (instance.relatable_type === "lesson") {
        delete instance.User_follow;
        delete instance.dataValues.User_follow;
      }
    }
  });
  return Activity_log;
};
