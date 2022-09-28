const { Router } = require("express");

const wordsController = require("../controllers/words");

const router = Router();

router.get("/user", wordsController.getWordsLearnedByUserId);

module.exports = router;
