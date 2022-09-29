const ResponseHelper = require("../helpers/response");

const { Word, Result } = require("../models");

module.exports = {
  getWordsLearnedByUserId: async (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
      return res.send(ResponseHelper.generateResponse(400, "Missing query id"));
    }

    const results = await Result.findAll({
      where: { user_id, is_correct: true },
      include: { model: Word },
    });

    const words_learned = results.map((result) => result.Word);

    res.send(
      ResponseHelper.generateResponse(200, "Success", { words_learned })
    );
  },
};
