const { Router } = require("express");

const resultsController = require("../../controllers/user/results");
const { verifyToken } = require("../../middleware/auth.js");

const router = Router();

router.use(verifyToken);

router.get("/lesson", resultsController.getResultByLessonId);
router.post("/", resultsController.createResult);

module.exports = router;
