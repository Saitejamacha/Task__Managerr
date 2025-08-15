const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authMiddleware.protect, authController.getCurrentUser);
router.put("/timezone", authMiddleware.protect, authController.updateTimezone);

module.exports = router;
