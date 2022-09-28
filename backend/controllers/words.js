const ResponseHelper = require("../helpers/response");

const { Word, Result } = require("../models");

module.exports = {
  getWordsLearnedByUserId: async (req, res) => {
    const { user_id } = req.query;

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
