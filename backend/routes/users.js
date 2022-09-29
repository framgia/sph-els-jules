const { Router } = require("express");

const usersController = require("../controllers/users");

const router = Router();

router.get("/", usersController.getUsers);
router.get("/activity-logs", usersController.getActivityLogsByUserId);
router.get("/learn-count", usersController.getLearningsCountByUserId);
router.get("/profile", usersController.getUserProfile);

module.exports = router;
