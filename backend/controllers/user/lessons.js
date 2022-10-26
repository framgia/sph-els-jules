const { Lesson, Lesson_word, Result, Word } = require("../../models");

const ResponseHelper = require("../../helpers/response");

module.exports = {
  getLessons: async (req, res) => {
    const { currentUserId } = req;
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 5;
    const offset = limit * (page - 1);

    const { count, rows } = await Lesson.findAndCountAll({
      limit,
      offset,
      include: { model: Lesson_word, include: { model: Word } },
      distinct: true,
    });

    const lessons = await Promise.all(
      rows.map(async (lesson) => {
        const result = await Result.findAll({
          where: { user_id: currentUserId, lesson_id: lesson.id },
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
