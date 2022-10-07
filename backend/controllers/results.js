const { Result, Activity_log } = require("../models");

const ResponseHelper = require("../helpers/response");

module.exports = {
  createResult: async (req, res) => {
    const { user_id, word_id, lesson_id, answer, is_correct } = req.body;

    if (!(user_id && word_id && lesson_id && answer && is_correct))
      return res.send(ResponseHelper.generateResponse(403, "Missing field(s)"));

    const result = await Result.create({
      user_id,
      word_id,
      lesson_id,
      answer,
      is_correct,
    });

    const activity_log = await Activity_log.findOne({
      where: { user_id, relatable_id: lesson_id, relatable_type: "lesson" },
    });

    if (!activity_log) {
      await Activity_log.create({
        user_id,
        relatable_id: lesson_id,
        relatable_type: "lesson",
      });
    }

    res.send(ResponseHelper.generateResponse(200, "Success", { result }));
  },
};
