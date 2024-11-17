// /backend/controllers/languageController.js

const User = require('../models/User');
const Language = require('../models/Language');
const Progress = require('../models/Progress'); // assuming a Progress model to track user progress in languages

// Fetch language materials for a specific language
const getLanguageMaterials = async (req, res) => {
  try {
    const { languageId } = req.params;

    // Find the language by ID
    const language = await Language.findById(languageId);
    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }

    // Get materials for this language
    const materials = language.materials; // assuming materials are an array within the language document

    res.status(200).json({ materials });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching language materials' });
  }
};

// Fetch all available languages
const getAllLanguages = async (req, res) => {
  try {
    const languages = await Language.find();
    if (!languages) {
      return res.status(404).json({ message: 'No languages available' });
    }
    res.status(200).json({ languages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching languages' });
  }
};

// Get the user's progress in a specific language
const getUserProgress = async (req, res) => {
  try {
    const { userId, languageId } = req.params;

    // Fetch user progress for the specific language
    const progress = await Progress.findOne({ userId, languageId });

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found for this language' });
    }

    res.status(200).json({ progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user progress' });
  }
};

// Update the user's progress (e.g., completed lessons, tests taken)
const updateUserProgress = async (req, res) => {
  try {
    const { userId, languageId } = req.params;
    const { completedLessons, testsTaken } = req.body;

    // Find the user's progress for the language
    let progress = await Progress.findOne({ userId, languageId });

    if (!progress) {
      // If no progress exists, create new progress record
      progress = new Progress({
        userId,
        languageId,
        completedLessons: 0,
        testsTaken: 0,
      });
    }

    // Update the progress
    progress.completedLessons += completedLessons;
    progress.testsTaken += testsTaken;

    // Save the progress
    await progress.save();

    res.status(200).json({
      message: 'User progress updated successfully',
      progress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user progress' });
  }
};

// Add new language materials (for admin purposes)
const addLanguageMaterial = async (req, res) => {
  try {
    const { languageId, title, content } = req.body;

    // Find the language by ID
    const language = await Language.findById(languageId);
    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }

    // Add the new material to the language
    language.materials.push({ title, content });

    // Save the updated language
    await language.save();

    res.status(201).json({
      message: 'Language material added successfully',
      materials: language.materials,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding language material' });
  }
};

module.exports = {
  getLanguageMaterials,
  getAllLanguages,
  getUserProgress,
  updateUserProgress,
  addLanguageMaterial,
};
