const ResponseHelper = require("../../helpers/response");

const { Lesson, Lesson_word, Result, Word } = require("../../models");

module.exports = {
  getLessons: async (req, res) => {
    let lessons = await Lesson.findAll({
      include: { model: Lesson_word, include: { model: Word } },
    });

    res.send(ResponseHelper.generateResponse(200, "Success", { lessons }));
  },
};
