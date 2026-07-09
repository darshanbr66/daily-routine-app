const mongoose = require("mongoose");

const routineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 500,
    },

    icon: {
      type: String,
      default: "Circle",
    },

    color: {
      type: String,
      default: "#3B82F6",
    },

    timeOfDay: {
      type: String,
      enum: [
        "morning",
        "afternoon",
        "evening",
        "night",
        "custom",
      ],
      default: "morning",
    },

    repeatDays: [
      {
        type: String,
        enum: [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ],
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    /**
     * Reserved for Version 2
     * (Routine steps / linked entities)
     */
    items: [
      {
        type: {
          type: String,
          enum: [
            "task",
            "habit",
            "goal",
            "note",
            "event",
          ],
        },

        refId: {
          type: mongoose.Schema.Types.ObjectId,
        },

        order: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Routine",
  routineSchema
);