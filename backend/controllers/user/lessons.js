const { Lesson, Lesson_word, Result, Word } = require("../../models");

const ResponseHelper = require("../../helpers/response");

module.exports = {
  getLessons: async (req, res) => {
    const { user_id } = req.query;
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 5;
    const offset = limit * (page - 1);

    const count = await Lesson.count({});
    let lessons = await Lesson.findAll({
      limit,
      offset,
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

    res.send(
      ResponseHelper.generateResponse(200, "Success", {
        page,
        limit,
        count,
        lessons,
      })
    );
  },
};
