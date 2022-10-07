const ResponseHelper = require("../helpers/response");

const { Lesson, Lesson_word, Result, Word } = require("../models");

module.exports = {
  getLessons: async (req, res) => {
    const { user_id } = req.query;
    let lessons = await Lesson.findAll({
      include: { model: Lesson_word, include: { model: Word } },
    });

    lessons = await Promise.all(
      lessons.map(async (lesson) => {
        const result = await Result.findAll({
          where: { user_id, lesson_id: lesson.id },
        });

        return { ...lesson.dataValues, result };
      })
    );

    res.send(ResponseHelper.generateResponse(200, "Success", { lessons }));
  },
};
