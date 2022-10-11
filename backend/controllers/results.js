const { Result, Activity_log } = require("../models");

const ResponseHelper = require("../helpers/response");

module.exports = {
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
