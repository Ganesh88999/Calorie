import express from 'express';
import { authenticate } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile (including calorie goal and deficit plan)
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { age, weight, height, gender, dailyCalorieGoal, doctorDeficitPlan } = req.body;

    const updateData = {};
    if (age !== undefined) updateData['profile.age'] = age;
    if (weight !== undefined) updateData['profile.weight'] = weight;
    if (height !== undefined) updateData['profile.height'] = height;
    if (gender !== undefined) updateData['profile.gender'] = gender;
    if (dailyCalorieGoal !== undefined) updateData['profile.dailyCalorieGoal'] = dailyCalorieGoal;
    if (doctorDeficitPlan !== undefined) updateData['profile.doctorDeficitPlan'] = doctorDeficitPlan;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: updateData },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

