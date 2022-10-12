const { Router } = require("express");

const lessonsController = require("../../controllers/admin/lessons");

const router = Router();

router.get("/", lessonsController.getLessons);

module.exports = router;
