const { Router } = require("express");

const usersController = require("../controllers/users");

const router = Router();

router.get("/", usersController.getUsers);
router.get("/id", usersController.getUserById);
router.get("/activity-logs", usersController.getActivityLogsByUserId);
router.get("/learn-count", usersController.getLearningsCountByUserId);
router.get("/profile", usersController.getUserProfileByUserId);
router.put("/profile", usersController.updateProfileById);
router.post("/toggle-follow", usersController.toggleFollow);

module.exports = router;
