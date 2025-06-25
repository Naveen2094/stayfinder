# StayFinder 🏡

A modern full-stack web app inspired by Airbnb that allows users to browse, list, and book properties for short-term or long-term stays. Built with **React**, **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features

- User Authentication (Register & Login)
- Browse properties by city with detailed listings
- Property detail pages with images and booking calendar
- Seamless booking flow with user details & date selection
- Responsive and clean UI inspired by Airbnb
- Backend RESTful API for properties, bookings, and users

---

## 🎨 Screenshots

### Home Page - Property Listings  
![Home Page](./server/images/home.png)

### Explore Page - Browse by City  
![Explore Page](./server/images/explore.png)

### Booking Page - Confirm Your Stay  
![Booking Page](./server/images/booking.png)

---

## 💻 Tech Stack

- **Frontend:** React, React Router, Axios, Bootstrap  
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT for authentication  
- **Database:** MongoDB Atlas / Local MongoDB  

---

## 📦 Installation & Setup

1. Clone the repo  
   ```bash
   git clone https://github.com/yourusername/stayfinder.git
   cd stayfinder/stayfinder/server

2. Install dependencies

bash
Copy
Edit
npm install

3. Setup .env file in the server folder:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

4. Start the backend server

bash
Copy
Edit
npm run dev

5. Open another terminal and start the frontend (from client folder):

bash
Copy
Edit
cd ../client
npm install
npm start

6. Open http://localhost:3000 to view the app.


✨ Future Improvements (Bonus)
Search filters by location, price, and availability

Map integration (Google Maps/Mapbox)

Mock payment gateway integration (Stripe)

Host dashboard to manage listings

Enhanced UI/UX with animations and transitions

🤝 Contributing
Feel free to open issues or submit pull requests. Your feedback and contributions are welcome!

📄 License
This project is licensed under the MIT License.

Made with ❤️ by Naveen Kumar P
