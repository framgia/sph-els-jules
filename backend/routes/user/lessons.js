const { Router } = require("express");

const lessonsController = require("../../controllers/user/lessons");
const { verifyToken } = require("../../middleware/auth.js");

const router = Router();

router.use(verifyToken);

router.get("/", lessonsController.getLessons);

module.exports = router;
