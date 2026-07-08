const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    content: {
      type: String,
      default: "",
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "personal",
        "work",
        "study",
        "ideas",
        "other",
      ],
      default: "personal",
    },

    color: {
      type: String,
      default: "#FFFFFF",
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Note",
  noteSchema
);