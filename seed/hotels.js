// server/seed/hotels.js
const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');

mongoose.connect('mongodb://127.0.0.1:27017/stayfinder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cityData = [
  { id: 1, city: "Paris" },
  { id: 2, city: "Tokyo" },
  { id: 3, city: "Goa" },
  { id: 4, city: "Angkor" },
  { id: 5, city: "Great Wall" },
  { id: 6, city: "Machu Picchu" },
  { id: 7, city: "Grand Canyon" },
  { id: 8, city: "Santorini" },
  { id: 9, city: "Sydney" },
  { id: 10, city: "Rome" },
  { id: 11, city: "Cape Town" },
];

const roomTypes = ['Single', 'Double', 'Suite'];
const amenitiesList = [
  ['WiFi', 'Breakfast'],
  ['WiFi', 'Pool', 'Breakfast'],
  ['AC', 'Room Service', 'WiFi'],
  ['Heater', 'Breakfast'],
  ['WiFi', 'Hot Water', 'Breakfast'],
];

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const hotels = [];

cityData.forEach(({ city }) => {
  for (let i = 1; i <= 3; i++) {
    hotels.push({
      name: `${city} Stay ${i}`,
      city: city,
      address: `${Math.floor(Math.random() * 1000)} ${city} Street`,
      pricePerNight: Math.floor(Math.random() * 2500) + 1500,
      roomType: randomFrom(roomTypes),
      amenities: randomFrom(amenitiesList),
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      availableRooms: Math.floor(Math.random() * 8) + 2,
      description: `Enjoy your stay at ${city} Stay ${i} with premium comfort and service.`,
      imageUrl: `https://source.unsplash.com/600x400/?hotel,${city}`
    });
  }
});

async function seedDB() {
  try {
    await Hotel.deleteMany({});
    await Hotel.insertMany(hotels);
    console.log('✅ All hotels inserted successfully!');
  } catch (error) {
    console.error('❌ Error inserting hotels:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
