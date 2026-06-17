const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  ownerName: String,
  contactNumber: String,
  whatsappNumber: String,
  gmapsLink: String,
  district: String,
  description: String,
  images: [String],
  status: { type: String, default: 'pending' }, // 'pending', 'approved'
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shop', ShopSchema);
