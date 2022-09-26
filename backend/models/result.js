"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    static associate(models) {
      const { User, Activity_log, Word, Lesson } = models;

      User.hasMany(Result);
      Result.belongsTo(User);

      Lesson.hasMany(Result);
      Result.belongsTo(Lesson);

      Word.hasMany(Result);
      Result.belongsTo(Word);

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
  Result.init(
    {
      user_id: DataTypes.INTEGER,
      word_id: DataTypes.INTEGER,
      lesson_id: DataTypes.INTEGER,
      answer: DataTypes.STRING,
      is_correct: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Result",
    }
  );
  return Result;
};
