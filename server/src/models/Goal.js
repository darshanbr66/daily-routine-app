const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Career",
        "Health",
        "Fitness",
        "Learning",
        "Finance",
        "Personal",
        "Business",
        "Travel",
        "Other",
      ],
      default: "Personal",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    status: {
      type: String,
      enum: [
        "not-started",
        "in-progress",
        "completed",
        "on-hold",
      ],
      default: "not-started",
      index: true,
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    targetDate: {
      type: Date,
      default: null,
      index: true,
    },

    color: {
      type: String,
      default: "#4F46E5",
    },

    icon: {
      type: String,
      default: "🎯",
    },

    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Goal",
  goalSchema
);