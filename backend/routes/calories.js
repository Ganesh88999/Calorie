import express from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/auth.js';
import CalorieEntry from '../models/CalorieEntry.js';
import { estimateCalories, estimateCaloriesFromImage } from '../utils/calorieEstimator.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Get all calorie entries for a user (with date filtering)
router.get('/', authenticate, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = { userId: req.userId };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const entries = await CalorieEntry.find(query).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    console.error('Get calories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get daily total calories
router.get('/daily/:date', authenticate, async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const entries = await CalorieEntry.find({
      userId: req.userId,
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);

    res.json({
      date: req.params.date,
      entries,
      totalCalories
    });
  } catch (error) {
    console.error('Get daily calories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get weekly summary
router.get('/weekly', authenticate, async (req, res) => {
  try {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const entries = await CalorieEntry.find({
      userId: req.userId,
      date: { $gte: weekAgo }
    });

    // Group by date
    const dailyTotals = {};
    entries.forEach(entry => {
      const dateKey = entry.date.toISOString().split('T')[0];
      if (!dailyTotals[dateKey]) {
        dailyTotals[dateKey] = 0;
      }
      dailyTotals[dateKey] += entry.calories;
    });

    // Create array of daily totals for the last 7 days
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      weeklyData.push({
        date: dateKey,
        calories: dailyTotals[dateKey] || 0
      });
    }

    res.json(weeklyData);
  } catch (error) {
    console.error('Get weekly calories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add calorie entry (text-based)
router.post('/', authenticate, async (req, res) => {
  try {
    const { foodName, calories, mealType, date } = req.body;

    if (!foodName) {
      return res.status(400).json({ message: 'Food name is required' });
    }

    const estimatedCalories = calories || estimateCalories(foodName);

    const entry = new CalorieEntry({
      userId: req.userId,
      foodName,
      calories: estimatedCalories,
      mealType: mealType || 'snack',
      date: date ? new Date(date) : new Date()
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    console.error('Add calorie error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add calorie entry from image
router.post('/from-image', authenticate, upload.single('image'), async (req, res) => {
  try {
    // In production, upload to Cloudinary and use AI service
    // For now, we'll use a simple text input from the user
    const { foodName, calories } = req.body;

    if (!foodName) {
      return res.status(400).json({ message: 'Food name is required' });
    }

    const estimatedCalories = calories || estimateCalories(foodName);

    const entry = new CalorieEntry({
      userId: req.userId,
      foodName,
      calories: estimatedCalories,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : '',
      date: new Date()
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    console.error('Add calorie from image error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete calorie entry
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const entry = await CalorieEntry.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    await CalorieEntry.deleteOne({ _id: req.params.id });
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Delete calorie error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

