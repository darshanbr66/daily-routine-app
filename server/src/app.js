const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const apiRoutes = require("./routes");

const app = express();

/**
 * Security Middleware
 */
app.use(helmet());

/**
 * CORS
 */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

/**
 * Body Parsers
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Cookie Parser
 */
app.use(cookieParser());

/**
 * Compress Response
 */
app.use(compression());

/**
 * HTTP Request Logger
 */
app.use(morgan("dev"));

/**
 * Root Route
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Daily Routine API is running...",
    version: "v1",
  });
});

/**
 * API Routes
 */
app.use("/api/v1", apiRoutes);

/**
 * 404 Route Handler
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;