"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lesson_word extends Model {
    static associate(models) {
      const { Lesson, Word } = models;

      Lesson.hasMany(Lesson_word);
      Lesson_word.belongsTo(Lesson);

      Word.hasMany(Word);
      Lesson_word.belongsTo(Word);
    }
  }
  Lesson_word.init(
    {
      lesson_id: DataTypes.INTEGER,
      word_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Lesson_word",
    }
  );
  return Lesson_word;
};
