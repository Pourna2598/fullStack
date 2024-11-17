// /backend/models/Progress.js

const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    languageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Language',
      required: true,
    },
    completedLessons: {
      type: Number,
      default: 0,
    },
    testsTaken: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
