const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  roomType: { type: String, enum: ['Single', 'Double', 'Suite'], required: true },
  amenities: [String], // e.g., ['WiFi', 'AC', 'Pool']
  rating: { type: Number, min: 0, max: 5 },
  availableRooms: { type: Number, default: 0 },
  description: String,
  imageUrl: String // optional for front-end display
});

module.exports = mongoose.model('Hotel', hotelSchema);
