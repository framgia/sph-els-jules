const { Op } = require("sequelize");

const { Lesson, Lesson_word, Word } = require("../../models");

const ResponseHelper = require("../../helpers/response");

module.exports = {
  getLessons: async (req, res) => {
    let lessons = await Lesson.findAll({
      where: { deleted_at: { [Op.eq]: null } },
      include: { model: Lesson_word, include: { model: Word } },
    });

    res.send(ResponseHelper.generateResponse(200, "Success", { lessons }));
  },
  getLessonById: async (req, res) => {
    const { id } = req.query;

    const lesson = await Lesson.findOne({
      where: { id, deleted_at: { [Op.eq]: null } },
      include: { model: Lesson_word, include: { model: Word } },
    });
    if (!lesson) {
      return res.send(ResponseHelper.generateNotFoundResponse("Lesson"));
    }

    res.send(ResponseHelper.generateResponse(200, "Success", { lesson }));
  },
  createLesson: async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.send(ResponseHelper.generateResponse(400, "Missing fields"));
    }

    const lesson = await Lesson.create({
      title,
      description,
    });

    res.send(ResponseHelper.generateResponse(200, "Success", { lesson }));
  },
  updateLessonById: async (req, res) => {
    const { id } = req.query;
    const { title, description } = req.body;

    const lesson = await Lesson.findOne({
      where: { id, deleted_at: { [Op.eq]: null } },
    });
    if (!lesson) {
      return res.send(ResponseHelper.generateNotFoundResponse("Lesson"));
    }

    lesson.set({
      title: title || lesson.title,
      description: description || lesson.description,
    });
    await lesson.save();

    res.send(ResponseHelper.generateResponse(200, "Success", { lesson }));
  },
  deleteLessonById: async (req, res) => {
    const { id } = req.query;

    const lesson = await Lesson.findOne({
      where: { id, deleted_at: { [Op.eq]: null } },
    });
    if (!lesson) {
      return res.send(ResponseHelper.generateNotFoundResponse("Lesson"));
    }

    lesson.set({
      deleted_at: new Date(),
    });
    await lesson.save();

    res.send(ResponseHelper.generateResponse(200, "Success", { lesson }));
  },
};
