const express = require('express');
const router = express.Router();
const Home = require('../models/Home');
const Shop = require('../models/Shop');

// Add Home (stores as pending)
router.post('/add-home', async (req, res) => {
  try {
    const home = new Home({ ...req.body, status: 'pending' });
    await home.save();
    res.status(201).json({ message: 'Home added successfully, awaiting admin approval' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Shop (stores as pending)
router.post('/add-shop', async (req, res) => {
  try {
    const shop = new Shop({ ...req.body, status: 'pending' });
    await shop.save();
    res.status(201).json({ message: 'Shop added successfully, awaiting admin approval' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get approved homes (Home Database)
router.get('/homes', async (req, res) => {
  try {
    const filters = { status: 'approved' };
    if (req.query.district) filters.district = new RegExp(req.query.district, 'i');
    const homes = await Home.find(filters).sort({ createdAt: -1 });
    res.json(homes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get approved shops (Shop Database)
router.get('/shops', async (req, res) => {
  try {
    const filters = { status: 'approved' };
    if (req.query.district) filters.district = new RegExp(req.query.district, 'i');
    const shops = await Shop.find(filters).sort({ createdAt: -1 });
    res.json(shops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
