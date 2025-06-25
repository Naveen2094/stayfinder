const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  images: {
    type: [String], // Array of image URLs
    default: [],
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Which user posted this listing
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Listing', listingSchema);
