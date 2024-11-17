// /backend/models/Language.js

const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    materials: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true }, // could also include media links (audio, videos, etc.)
      },
    ],
  },
  { timestamps: true }
);

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;
