import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ACCESS_KEY = 'Tl3tdp2CPUq2bSKaRvPXtxryEe_41EpbK57u5p1Tke4'; // Unsplash API Key

const destinations = [
  { id: 1, city: "Paris", place: "Eiffel Tower, Paris, France", drive: "Romantic Getaway" },
  { id: 2, city: "Tokyo", place: "Hotels in Tokyo, Japan", drive: "Modern Metropolis" },
  { id: 3, city: "Goa", place: "Beachside Goa", drive: "Chill Vibes" },
  { id: 4, city: "Angkor", place: "Temples of Angkor, Cambodia", drive: "Cultural Wonder" },
  { id: 5, city: "Great Wall", place: "Great Wall of China", drive: "Historic Wonder" },
  { id: 6, city: "Machu Picchu", place: "Machu Picchu, Peru", drive: "Ancient Incan City" },
  { id: 7, city: "Grand Canyon", place: "Grand Canyon, USA", drive: "Natural Marvel" },
  { id: 8, city: "Santorini", place: "Santorini, Greece", drive: "Sunset Paradise" },
  { id: 9, city: "Sydney", place: "Sydney Opera House, Australia", drive: "Cultural Icon" },
  { id: 10, city: "Rome", place: "Rome, Italy", drive: "Historical City" },
  { id: 11, city: "Cape Town", place: "Cape Town, South Africa", drive: "Scenic Beauty" }
];

function HomePage() {
  const [images, setImages] = useState({});
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  // Fetch images from Unsplash
  useEffect(() => {
    destinations.forEach(location => {
      axios.get('https://api.unsplash.com/search/photos', {
        params: { query: location.place, per_page: 1 },
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` }
      })
      .then(res => {
        const imgUrl = res.data.results[0]?.urls?.small || '';
        setImages(prev => ({ ...prev, [location.city]: imgUrl }));
      })
      .catch(err => console.error('Image fetch error:', location.city, err));
    });
  }, []);

  const handleCardClick = (cityId) => {
    navigate(`/explore/${cityId}`);
  };

  // Filtered destinations
  const filteredDestinations = destinations.filter(d =>
    d.city.toLowerCase().startsWith(filter.toLowerCase())
  );

  return (
    <div className="container py-4">
      <input
        type="text"
        placeholder="Search destinations"
        className="form-control form-control-lg rounded-pill shadow-sm mb-4"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      <h3 className="mb-4 fw-bold text-center">Top Places to Visit</h3>

      <div className="row g-4">
        {filteredDestinations.map((loc, idx) => (
          <div className="col-6 col-md-3" key={idx}>
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onClick={() => handleCardClick(loc.id)}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
            >
              <img
                src={images[loc.city] || 'https://placehold.co/300x200?text=Loading...'}
                alt={loc.city}
                className="card-img-top"
                style={{ height: '160px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <h6 className="fw-semibold mb-1">{loc.city}</h6>
                <small className="text-muted">{loc.drive}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
