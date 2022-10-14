const { Op } = require("sequelize");

const { Lesson, Lesson_word, Word } = require("../../models");

const ResponseHelper = require("../../helpers/response");

module.exports = {
  getWordById: async (req, res) => {
    const { id } = req.query;

    const word = await Word.findOne({ where: { id } });
    if (!word) {
      return res.send(ResponseHelper.generateNotFoundResponse("Word"));
    }

    res.send(ResponseHelper.generateResponse(200, "Success", { word }));
  },
  createWordByLessonId: async (req, res) => {
    const { lesson_id } = req.query;
    const { question, correct_answer, choice1, choice2, choice3, choice4 } =
      req.body;

    const lesson = await Lesson.findOne({ where: { id: lesson_id } });
    if (!lesson) {
      return res.send(ResponseHelper.generateNotFoundResponse("Lesson"));
    }

    if (
      !question ||
      !correct_answer ||
      !choice1 ||
      !choice2 ||
      !choice3 ||
      !choice4
    ) {
      return res.send(ResponseHelper.generateResponse(400, "Missing fields"));
    }

    const word = await Word.create({
      question,
      correct_answer,
      choice1,
      choice2,
      choice3,
      choice4,
    });

    await Lesson_word.create({
      lesson_id,
      word_id: word.id,
    });

    res.send(ResponseHelper.generateResponse(200, "Success", { word }));
  },
  updateWordById: async (req, res) => {
    const { id } = req.query;
    const { question, correct_answer, choice1, choice2, choice3, choice4 } =
      req.body;

    const word = await Word.findOne({ where: { id } });
    if (!word) {
      return res.send(ResponseHelper.generateNotFoundResponse("Word"));
    }

    word.set({
      question: question || word.question,
      correct_answer: correct_answer || word.correct_answer,
      choice1: choice1 || word.choice1,
      choice2: choice2 || word.choice2,
      choice3: choice3 || word.choice3,
      choice4: choice4 || word.choice4,
    });
    await word.save();

    res.send(ResponseHelper.generateResponse(200, "Success", { word }));
  },
  deleteWordById: async (req, res) => {
    const { id } = req.query;

    const word = await Word.findOne({ where: { id } });
    if (!word) {
      return res.send(ResponseHelper.generateNotFoundResponse("Word"));
    }

    await word.destroy();

    res.send(ResponseHelper.generateResponse(200, "Success", { word }));
  },
};
