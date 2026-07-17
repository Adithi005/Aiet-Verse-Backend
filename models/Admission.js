// const mongoose = require('mongoose');

// const AdmissionSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   course: { type: String, required: true },
//   submittedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Admission', AdmissionSchema);

const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admission', AdmissionSchema);