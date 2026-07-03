const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Health",
        "Fitness",
        "Learning",
        "Career",
        "Finance",
        "Personal",
        "Other",
      ],
      default: "Personal",
    },

    frequency: {
      type: String,
      enum: ["Daily"],
      default: "Daily",
    },

    reminderTime: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "#4F46E5",
    },

    icon: {
      type: String,
      default: "⭐",
    },

    completedDates: [
      {
        type: Date,
      },
    ],

    currentStreak: {
      type: Number,
      default: 0,
    },

    bestStreak: {
      type: Number,
      default: 0,
    },

    isArchived: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("Habit", habitSchema);