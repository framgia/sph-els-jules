const { Activity_log, Result, Word } = require("../models");

const ResponseHelper = require("../helpers/response");

module.exports = {
  getResultByLessonId: async (req, res) => {
    const { user_id, lesson_id } = req.query;

    const results = await Result.findAll({
      where: {
        user_id,
        lesson_id,
      },
      include: { model: Word },
    });

    res.send(
      ResponseHelper.generateResponse(200, "Success", {
        results,
        score: Result.getScore(results),
        item_count: results.length,
      })
    );
  },
  createResult: async (req, res) => {
    let rawResults = req.body;
    rawResults = Object.values(rawResults).map((result) => result);

    const results = await Result.bulkCreate(rawResults);
    if (!results) {
      return res.send(
        ResponseHelper.generateResponse(404, "No results were saved!")
      );
    }

    const activity_log = await Activity_log.create({
      user_id: results[0].user_id,
      relatable_id: results[0].lesson_id,
      relatable_type: "lesson",
    });

    res.send(
      ResponseHelper.generateResponse(200, "Success", { results, activity_log })
    );
  },
};
