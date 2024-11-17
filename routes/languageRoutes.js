const express = require('express');
const router = express.Router();
const { getLanguages, getLessons } = require('../controllers/languageController');

// Get all languages
router.get('/', getLanguages);

// Get lessons for a specific language
router.get('/:languageId/lessons', getLessons);

module.exports = router;
