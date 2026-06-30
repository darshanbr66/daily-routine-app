const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const taskController = require("../controllers/task.controller");

router.post("/", authenticate, taskController.createTask);

router.get("/", authenticate, taskController.getMyTasks);

router.get("/:id", authenticate, taskController.getTaskById);

router.put("/:id", authenticate, taskController.updateTask);

router.patch("/:id/status", authenticate, taskController.updateTaskStatus);

router.delete("/:id", authenticate, taskController.deleteTask);

module.exports = router;