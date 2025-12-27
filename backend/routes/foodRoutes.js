const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

// @route   GET /api/foods
// @desc    Get all food items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/foods/search
// @desc    Search food items by name
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const foods = await Food.find({
      foodName: { $regex: q, $options: 'i' } // Case-insensitive search
    });

    res.json(foods);
  } catch (error) {
    console.error('Error searching foods:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/foods/:id
// @desc    Get single food item by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json(food);
  } catch (error) {
    console.error('Error fetching food:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/foods
// @desc    Create new food item (Admin)
// @access  Public (TODO: Add admin authentication)
router.post('/', async (req, res) => {
  try {
    const { foodName, imageUrl, swiggy, zomato } = req.body;

    // Validation
    if (!foodName || !imageUrl || !swiggy || !zomato) {
      return res.status(400).json({ 
        message: 'Please provide all required fields' 
      });
    }

    // Create new food item
    const newFood = new Food({
      foodName,
      imageUrl,
      swiggy,
      zomato
    });

    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (error) {
    console.error('Error creating food:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/foods/:id
// @desc    Update food item (Admin)
// @access  Public (TODO: Add admin authentication)
router.put('/:id', async (req, res) => {
  try {
    const { foodName, imageUrl, swiggy, zomato } = req.body;

    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      { foodName, imageUrl, swiggy, zomato },
      { new: true, runValidators: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json(updatedFood);
  } catch (error) {
    console.error('Error updating food:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/foods/:id
// @desc    Delete food item (Admin)
// @access  Public (TODO: Add admin authentication)
router.delete('/:id', async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);

    if (!deletedFood) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json({ message: 'Food item deleted successfully' });
  } catch (error) {
    console.error('Error deleting food:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;