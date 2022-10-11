const { Router } = require("express");

const resultsController = require("../controllers/results");

const router = Router();

router.get("/lesson", resultsController.getResultByLessonId);
router.post("/", resultsController.createResult);

module.exports = router;
