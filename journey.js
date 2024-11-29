const mongoose = require('mongoose');

// Define the schema for the customer journey
const journeySchema = new mongoose.Schema({
  touchpoint: {
    type: String,
    required: true,
  },
  engagement: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create a model based on the schema
const Journey = mongoose.model('Journey', journeySchema);

module.exports = Journey;
