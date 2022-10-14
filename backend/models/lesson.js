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
      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Lesson",
      paranoid: true,
      deletedAt: "deleted_at",
    }
  );

  Lesson.addHook("afterDestroy", async (instance, options) => {
    const { Lesson_word, Result, Word } = sequelize.models;

    const lesson_words = await Lesson_word.findAll({
      where: { lesson_id: instance.id },
    });
    await Lesson_word.destroy({ where: { lesson_id: instance.id } });
    await Result.destroy({ where: { lesson_id: instance.id } });
    await Word.destroy({
      where: { id: lesson_words.map((lesson_word) => lesson_word.word_id) },
    });
  });

  return Lesson;
};
