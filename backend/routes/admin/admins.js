const { Router } = require("express");

const adminsController = require("../../controllers/admin/admins");

const router = Router();

router.get("/", adminsController.getAdmins);

module.exports = router;
