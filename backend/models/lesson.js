"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    static associate(models) {
      const { Lesson_word, Word, Result, Activity_log } = models;

      Lesson.belongsToMany(Word, {
        through: Lesson_word,
        foreignKey: "lesson_id",
      });
      Word.belongsToMany(Lesson, {
        through: Lesson_word,
        foreignKey: "lesson_id",
      });

      Lesson.hasMany(Lesson_word, { foreignKey: "lesson_id" });
      Lesson_word.belongsTo(Lesson, { foreignKey: "lesson_id" });

      Lesson.hasMany(Result, { foreignKey: "lesson_id" });
      Result.belongsTo(Lesson, { foreignKey: "lesson_id" });

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
  Lesson.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Lesson",
    }
  );
  return Lesson;
};
