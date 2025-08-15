const express = require("express");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Protect all routes
router.use(authMiddleware.protect);

router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.patch("/:id/status", taskController.updateTaskStatus);
router.get("/filter/status/:status", taskController.filterTasksByStatus);
router.get("/filter/date/:date", taskController.filterTasksByDate);

module.exports = router;
