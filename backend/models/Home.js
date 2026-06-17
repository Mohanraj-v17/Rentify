const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  ownerName: String,
  contactNumber: String,
  whatsappNumber: String,
  gmapsLink: String,
  district: String,
  tenantPreference: String, // 'family-only' or 'bachelor-friendly'
  bedrooms: String, // '1BHK', '2BHK', '3BHK'
  description: String,
  images: [String], // Array of base64 strings or URLs
  status: { type: String, default: 'pending' }, // 'pending', 'approved'
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Home', HomeSchema);
