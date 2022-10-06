const ResponseHelper = require("../helpers/response");

const { Lesson, Result, Activity_log } = require("../models");

module.exports = {
  getLessons: async (req, res) => {
    const { user_id } = req.query;
    let lessons = await Lesson.findAll({ raw: true });

    lessons = await Promise.all(
      lessons.map(async (lesson) => {
        const result = await Result.findAll({
          where: { user_id, lesson_id: lesson.id },
        });

        return { ...lesson, result };
      })
    );

    res.send(ResponseHelper.generateResponse(200, "Success", { lessons }));
  },
};
