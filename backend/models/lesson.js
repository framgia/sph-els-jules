"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    static associate(models) {
      const { Lesson_word, Word, Result } = models;

      Lesson.belongsToMany(Word, { through: Lesson_word });
      Word.belongsToMany(Lesson, { through: Lesson_word });

      Lesson.hasMany(Lesson_word);
      Lesson_word.belongsTo(Lesson);

      Lesson.hasMany(Result);
      Result.belongsTo(Lesson);
    }
  }
  Lesson.init(
    {
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
