const { Router } = require("express");

const lessonsController = require("../../controllers/user/lessons");

const router = Router();

router.get("/", lessonsController.getLessons);

module.exports = router;
