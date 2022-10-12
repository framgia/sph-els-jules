const { Router } = require("express");

const wordsController = require("../../controllers/user/words");

const router = Router();

router.get("/user", wordsController.getWordsLearnedByUserId);

module.exports = router;
