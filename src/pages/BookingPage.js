import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [form, setForm] = useState({ userName: '', email: '', checkIn: '', checkOut: '', guests: 1 });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/hotels/${hotelId}`)
      .then(res => setHotel(res.data))
      .catch(err => console.error('Error fetching hotel:', err));
  }, [hotelId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post('http://localhost:5000/api/bookings', {
      ...form,
      hotelId
    });
    alert('✅ Booking Confirmed!');
    navigate('/'); // or to a confirmation page
  } catch (err) {
    console.error('❌ Booking Failed:', err.response?.data || err.message);
    alert('❌ Booking Failed!');
  }
};

  if (!hotel) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Book Your Stay at {hotel.name}</h2>
      <p><strong>City:</strong> {hotel.city}</p>
      <p><strong>Price:</strong> ₹{hotel.pricePerNight} / night</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <input type="text" name="userName" className="form-control mb-2" placeholder="Your Name" required onChange={handleChange} />
        <input type="email" name="email" className="form-control mb-2" placeholder="Email" required onChange={handleChange} />
        <label>Check-In:</label>
        <input type="date" name="checkIn" className="form-control mb-2" required onChange={handleChange} />
        <label>Check-Out:</label>
        <input type="date" name="checkOut" className="form-control mb-2" required onChange={handleChange} />
        <label>Guests:</label>
        <input type="number" name="guests" className="form-control mb-3" min="1" value={form.guests} onChange={handleChange} />

        <button type="submit" className="btn btn-primary">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingPage;
