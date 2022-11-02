const { body } = require("express-validator");
const { Router } = require("express");

const authController = require("../../controllers/auth/auth");

const router = Router();

router.post("/login", authController.login);
router.post(
  "/signup",
  body("email").isEmail().withMessage("Invalid email address"),
  authController.signup
);

module.exports = router;
