const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Admission = require('./models/Admission');

// Load environmental variables
dotenv.config();

const app = express();

// Middleware: Allows your React frontend running on port 5173 to send data here
app.use(cors());
app.use(express.json());

// Establish connection to Local MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to AIET Local MongoDB successfully.'))
  .catch(err => console.error('MongoDB connection structural failure:', err));

// HTTP POST Route: Receives applicant data from React and saves it
app.post('/api/admission', async (req, res) => {
  try {
    const newApplication = new Admission(req.body);
    await newApplication.save();
    res.status(201).json({ success: true, message: 'Application logged successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server failed to process entry.', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`AIET Administrative Backend live on port ${PORT}`));