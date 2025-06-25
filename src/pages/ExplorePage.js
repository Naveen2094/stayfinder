import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const cityMap = {
  '1': 'Paris',
  '2': 'Tokyo',
  '3': 'Goa',
  '4': 'Angkor',
  '5': 'Great Wall',
  '6': 'Machu Picchu',
  '7': 'Grand Canyon',
  '8': 'Santorini',
  '9': 'Sydney',
  '10': 'Rome',
  '11': 'Cape Town'
};

const ExplorePage = () => {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const cityName = cityMap[cityId]; // Map ID to name

  useEffect(() => {
    if (!cityName) return;

    const fetchHotels = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/hotels/city/${encodeURIComponent(cityName)}`);
        setHotels(res.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [cityName]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Stays in {cityName}</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : hotels.length === 0 ? (
        <p className="text-center">No hotels found in {cityName}</p>
      ) : (
        <div className="row">
          {hotels.map((hotel) => (
            <div className="col-md-4 mb-4" key={hotel._id}>
              <div className="card h-100">
                <img
                  src={hotel.imageUrl || `https://source.unsplash.com/300x200/?hotel,${cityName}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/300x200?text=No+Image';
                  }}
                  className="card-img-top"
                  alt={hotel.name}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{hotel.name}</h5>
                  <p className="card-text">
                    <strong>₹{hotel.pricePerNight}</strong> / night<br />
                    <strong>Room:</strong> {hotel.roomType}<br />
                    <strong>Rating:</strong> ⭐ {hotel.rating}<br />
                    <strong>Amenities:</strong> {hotel.amenities?.join(', ')}
                  </p>
                  <button
                    className="btn btn-success"
                    onClick={() => navigate(`/book/${hotel._id}`)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
