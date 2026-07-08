const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500,
    },

    date: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      default: "",
    },

    endTime: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: [
        "personal",
        "work",
        "meeting",
        "reminder",
        "task",
        "habit",
        "goal",
      ],
      default: "personal",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    color: {
      type: String,
      default: "#3B82F6",
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    linkedTask: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      default: null,
    },

    linkedHabit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
      default: null,
    },

    linkedGoal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      default: null,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);