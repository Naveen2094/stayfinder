const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// Get a property by ID
router.get('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all properties by city
router.get('/properties/city/:city', async (req, res) => {
  const city = req.params.city;
  const properties = await Property.find({ city });
  res.json(properties);
});

module.exports = router;
