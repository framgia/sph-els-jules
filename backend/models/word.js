"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    static associate(models) {
      const { Lesson_word, Lesson, Result } = models;

      Word.belongsToMany(Lesson, { through: Lesson_word });
      Lesson.belongsToMany(Word, { through: Lesson_word });

      Word.hasMany(Lesson_word);
      Lesson_word.belongsTo(Word);

      Word.hasMany(Result);
      Result.belongsTo(Word);
    }
  }
  Word.init(
    {
      question: DataTypes.STRING,
      correct_answer: DataTypes.STRING,
      choice1: DataTypes.STRING,
      choice2: DataTypes.STRING,
      choice3: DataTypes.STRING,
      choice4: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Word",
    }
  );
  return Word;
};
