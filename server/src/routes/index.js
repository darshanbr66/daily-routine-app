const express = require("express");

const router = express.Router();

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const taskRoutes = require("./task.routes");
const dashboardRoutes = require("./dashboard.routes");
const habitRoutes = require("./habit.routes");
const goalRoutes = require("./goal.routes");
const eventRoutes = require("./event.routes");

// Health Check
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Healthy",
  });
});

// Routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/habits", habitRoutes);
router.use("/goals", goalRoutes);
router.use("/events", eventRoutes);

module.exports = router;