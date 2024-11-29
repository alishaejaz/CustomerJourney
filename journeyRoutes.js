const express = require('express');
const Journey = require('../models/journey');
const router = express.Router();

// 1. Create a new customer journey
router.post('/create', async (req, res) => {
  try {
    const { touchpoint, engagement, feedback } = req.body;
    
    const newJourney = new Journey({
      touchpoint,
      engagement,
      feedback
    });

    await newJourney.save();
    res.status(201).json({ message: "Journey created successfully", journey: newJourney });
  } catch (err) {
    res.status(500).json({ message: "Error creating journey", error: err });
  }
});

// 2. Get all customer journeys
router.get('/all', async (req, res) => {
  try {
    const journeys = await Journey.find();
    res.status(200).json(journeys);
  } catch (err) {
    res.status(500).json({ message: "Error fetching journeys", error: err });
  }
});

// 3. Get a specific customer journey by ID
router.get('/:id', async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);
    if (!journey) {
      return res.status(404).json({ message: "Journey not found" });
    }
    res.status(200).json(journey);
  } catch (err) {
    res.status(500).json({ message: "Error fetching journey", error: err });
  }
});

// 4. Update a customer journey
router.put('/update/:id', async (req, res) => {
  try {
    const { touchpoint, engagement, feedback } = req.body;
    const updatedJourney = await Journey.findByIdAndUpdate(
      req.params.id,
      { touchpoint, engagement, feedback },
      { new: true }
    );
    
    if (!updatedJourney) {
      return res.status(404).json({ message: "Journey not found" });
    }
    res.status(200).json({ message: "Journey updated successfully", journey: updatedJourney });
  } catch (err) {
    res.status(500).json({ message: "Error updating journey", error: err });
  }
});

// 5. Delete a customer journey
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedJourney = await Journey.findByIdAndDelete(req.params.id);
    if (!deletedJourney) {
      return res.status(404).json({ message: "Journey not found" });
    }
    res.status(200).json({ message: "Journey deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting journey", error: err });
  }
});

module.exports = router;
