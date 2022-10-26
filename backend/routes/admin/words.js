const { Router } = require("express");

const wordsController = require("../../controllers/admin/words");
const { verifyToken } = require("../../middleware/auth.js");
const { isAdmin } = require("../../middleware/admin");

const router = Router();

router.use(verifyToken);
router.use(isAdmin);

router.get("/", wordsController.getWordsByLessonId);
router.get("/id", wordsController.getWordById);
router.post("/", wordsController.createWordByLessonId);
router.put("/update/id", wordsController.updateWordById);
router.delete("/delete/id", wordsController.deleteWordById);

module.exports = router;
