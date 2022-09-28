"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lesson_word extends Model {
    static associate(models) {
      const { Lesson, Word } = models;

      Lesson.hasMany(Lesson_word, { foreignKey: "lesson_id" });
      Lesson_word.belongsTo(Lesson, { foreignKey: "lesson_id" });

      Word.hasMany(Word, { foreignKey: "word_id" });
      Lesson_word.belongsTo(Word, { foreignKey: "word_id" });
    }
  }
  Lesson_word.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
