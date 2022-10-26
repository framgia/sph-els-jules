const { Router } = require("express");

const wordsController = require("../../controllers/user/words");
const { verifyToken } = require("../../middleware/auth.js");

const router = Router();

router.use(verifyToken);

router.get("/user", wordsController.getWordsLearnedByUserId);

module.exports = router;
