// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const Admission = require('./models/Admission');

// // Load environmental variables
// dotenv.config();

// const app = express();

// // Middleware: Allows your React frontend running on port 5173 to send data here
// app.use(cors());
// app.use(express.json());

// // Establish connection to Local MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('Connected to AIET Local MongoDB successfully.'))
//   .catch(err => console.error('MongoDB connection structural failure:', err));

// // HTTP POST Route: Receives applicant data from React and saves it
// app.post('/api/admission', async (req, res) => {
//   try {
//     const newApplication = new Admission(req.body);
//     await newApplication.save();
//     res.status(201).json({ success: true, message: 'Application logged successfully!' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server failed to process entry.', error: error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`AIET Administrative Backend live on port ${PORT}`));


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Loads configuration keys securely from the .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Configuration
app.use(cors());
app.use(express.json());

// Main Database Connection Layer
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`🚀 MongoDB Connected Safely: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database Connection Failure: ${error.message}`);
    process.exit(1); // Force terminates backend server script execution if the connection fails
  }
};

// Establish Database Connection Instance
connectDB();

// Root route placeholder to test health status
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "online", database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
});

// Start listening for inbound pipeline requests
app.listen(PORT, () => {
  console.log(`🛰️  Backend system active and listening on port: ${PORT}`);
});