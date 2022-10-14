const { Router } = require("express");

const wordsController = require("../../controllers/admin/words");

const router = Router();

router.get("/", wordsController.getWordsByLessonId);
router.get("/id", wordsController.getWordById);
router.post("/", wordsController.createWordByLessonId);
router.put("/update/id", wordsController.updateWordById);
router.delete("/delete/id", wordsController.deleteWordById);

module.exports = router;
