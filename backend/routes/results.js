const { Router } = require("express");

const resultsController = require("../controllers/results");

const router = Router();

router.post("/", resultsController.createResult);

module.exports = router;
