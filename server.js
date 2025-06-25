require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const propertyRoutes = require('./routes/property');
const uploadRoutes = require('./routes/upload');
const hotelRoutes = require('./routes/hotels');
const bookingRoutes = require('./routes/booking');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/properties', propertyRoutes);
app.use('/api', uploadRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/test', (req, res) => res.json({ msg: "test route works" }));


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/uploads', express.static('uploads'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
