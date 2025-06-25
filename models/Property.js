const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  price: Number,
  images: [String],
  location: String, // MUST BE PRESENT
  description: String,
  city: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },

  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Property', propertySchema);
