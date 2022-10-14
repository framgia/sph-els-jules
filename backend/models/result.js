"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    static associate(models) {
      const { User, Word, Lesson } = models;

      User.hasMany(Result, { foreignKey: "user_id" });
      Result.belongsTo(User, { foreignKey: "user_id" });

      Lesson.hasMany(Result, { foreignKey: "lesson_id" });
      Result.belongsTo(Lesson, { foreignKey: "lesson_id" });

      Word.hasMany(Result, { foreignKey: "word_id" });
      Result.belongsTo(Word, { foreignKey: "word_id" });
    }
  }
  Result.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: DataTypes.INTEGER,
      word_id: DataTypes.INTEGER,
      lesson_id: DataTypes.INTEGER,
      answer: DataTypes.STRING,
      is_correct: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Result",
      paranoid: true,
      deletedAt: "deleted_at",
    }
  );

  Result.getScore = (results) => {
    const score = results.reduce((total, item) => {
      if (item.is_correct) total++;
      return total;
    }, 0);
    return score;
  };

  return Result;
};
