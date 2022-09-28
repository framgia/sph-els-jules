"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    static associate(models) {
      const { Lesson_word, Result } = models;

      Word.hasMany(Lesson_word, { foreignKey: "word_id" });
      Lesson_word.belongsTo(Word, { foreignKey: "word_id" });

      Word.hasMany(Result, { foreignKey: "word_id" });
      Result.belongsTo(Word, { foreignKey: "word_id" });
    }
  }
  Word.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
