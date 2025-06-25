const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

// Get hotels by city
router.get('/city/:city', async (req, res) => {
  try {
    const hotels = await Hotel.find({ city: req.params.city });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching hotels by city' });
  }
});

// Get hotel by ID
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching hotel by ID' });
  }
});

module.exports = router;
