const Booking = require('../models/Booking');
const Listing = require('../models/Listing');

// ✅ Create a Booking
const createBooking = async (req, res) => {
  const { listingId, startDate, endDate, guests } = req.body;

  try {
    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ msg: 'Listing not found' });

    const newBooking = new Booking({
      user: req.user.id,
      listing: listingId,
      startDate,
      endDate,
      guests,
      status: 'pending',
    });

    await newBooking.save();
    res.status(201).json({ msg: 'Booking created', booking: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ msg: 'Server error creating booking' });
  }
};

// ✅ Get Bookings for Logged-in User
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('listing');
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ msg: 'Server error fetching bookings' });
  }
};

// ✅ Cancel or Update Booking (e.g., status to 'cancelled')
const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });

    if (booking.user.toString() !== req.user.id)
      return res.status(403).json({ msg: 'Unauthorized' });

    booking.status = status || booking.status;
    await booking.save();

    res.json({ msg: 'Booking updated', booking });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ msg: 'Server error updating booking' });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  updateBookingStatus,
};
