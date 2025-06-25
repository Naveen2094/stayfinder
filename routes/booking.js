const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// ✅ TEST BOOKING ROUTE
router.get('/test-book', async (req, res) => {
  try {
    const newBooking = new Booking({
  userName: "Test User",
  email: "test@example.com",
  hotelId: "665abc1234d5e6f7890a1234", // 👈 use real ObjectId from hotels collection
  checkIn: new Date("2025-07-01"),
  checkOut: new Date("2025-07-05"),
  guests: 2
});


    await newBooking.save();
    res.status(201).json({ message: '✅ Test booking created', booking: newBooking });
  } catch (error) {
    console.error('❌ Error in test-book route:', error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ ACTUAL BOOKING ROUTE
router.post('/', async (req, res) => {
  console.log('📩 Received booking:', req.body); // 🔍 ADD THIS LINE

  try {
    const { userName, email, hotelId, checkIn, checkOut, guests } = req.body;

    if (!userName || !email || !hotelId || !checkIn || !checkOut || !guests) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newBooking = new Booking({
      userName,
      email,
      hotelId,
      checkIn,
      checkOut,
      guests,
    });

    await newBooking.save();
    res.status(201).json({ message: '✅ Booking confirmed!', booking: newBooking });

  } catch (error) {
    console.error('❌ Error saving booking:', error);
    res.status(500).json({ message: '❌ Booking failed', error: error.message });
  }
});


module.exports = router;
