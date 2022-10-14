const { Router } = require("express");

const lessonsController = require("../../controllers/admin/lessons");

const router = Router();

router.get("/", lessonsController.getLessons);
router.get("/id", lessonsController.getLessonById);
router.post("/", lessonsController.createLesson);
router.put("/update/id", lessonsController.updateLessonById);
router.delete("/delete/id", lessonsController.deleteLessonById);

module.exports = router;
