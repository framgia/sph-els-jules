const {
  Word,
  Result,
  Lesson,
  Lesson_word,
  Activity_log,
} = require("../../models");

const ResponseHelper = require("../../helpers/response");

module.exports = {
  getWordsLearnedByUserId: async (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
      return res.send(ResponseHelper.generateResponse(400, "Missing query id"));
    }

    const activity_logs = await Activity_log.findAll({
      where: { user_id, relatable_type: "lesson" },
    });

    const lessonIds = activity_logs.map(
      (activity_log) => activity_log.relatable_id
    );

    const lessons = await Lesson.findAll({
      where: { id: lessonIds },
      include: { model: Lesson_word },
    });

    const results = await Promise.all(
      lessons.map(async (lesson) => {
        const result = await Result.findAll({
          where: { user_id, lesson_id: lesson.id },
          include: [Word],
          limit: lesson.Lesson_words.length,
          order: [["id", "DESC"]],
        });
        return result;
      })
    );

    const words_learned = results.map((result) => {
      const learned = result.filter((word) => word.is_correct);
      return learned.map((word) => word.Word);
    });

    res.send(
      ResponseHelper.generateResponse(200, "Success", {
        words_learned: words_learned.flat(),
      })
    );
  },
};
