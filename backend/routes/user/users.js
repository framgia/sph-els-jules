const { Router } = require("express");

const usersController = require("../../controllers/user/users");
const { verifyToken } = require("../../middleware/auth.js");

const router = Router();

router.use(verifyToken);

router.get("/", usersController.getUsers);
router.get("/id", usersController.getUserById);
router.get("/activity-logs", usersController.getUserFeed);
router.get("/learn-count", usersController.getLearningsCountByUserId);
router.get("/profile", usersController.getUserProfileByUserId);
router.put("/profile", usersController.updateProfileById);
router.post("/toggle-follow", usersController.toggleFollow);

module.exports = router;
