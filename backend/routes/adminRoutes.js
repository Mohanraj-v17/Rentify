const express = require('express');
const router = express.Router();
const Home = require('../models/Home');
const Shop = require('../models/Shop');

// Hardcoded admin login logic based on requirement
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'Mohan' && password === 'mohan@25') {
    res.json({ token: 'admin-token' });
  } else {
    res.status(401).json({ message: 'Invalid admin credentials' });
  }
});

// Get pending homes
router.get('/pending-homes', async (req, res) => {
  try {
    const homes = await Home.find({ status: 'pending' });
    res.json(homes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get pending shops
router.get('/pending-shops', async (req, res) => {
  try {
    const shops = await Shop.find({ status: 'pending' });
    res.json(shops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Approve home
router.put('/approve-home/:id', async (req, res) => {
  try {
    await Home.findByIdAndUpdate(req.params.id, { status: 'approved' });
    res.json({ message: 'Home approved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reject (delete) home
router.delete('/reject-home/:id', async (req, res) => {
  try {
    await Home.findByIdAndDelete(req.params.id);
    res.json({ message: 'Home rejected' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Approve shop
router.put('/approve-shop/:id', async (req, res) => {
  try {
    await Shop.findByIdAndUpdate(req.params.id, { status: 'approved' });
    res.json({ message: 'Shop approved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reject (delete) shop
router.delete('/reject-shop/:id', async (req, res) => {
  try {
    await Shop.findByIdAndDelete(req.params.id);
    res.json({ message: 'Shop rejected' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get total counts
router.get('/stats', async (req, res) => {
  try {
    const homesCount = await Home.countDocuments({ status: 'approved' });
    const shopsCount = await Shop.countDocuments({ status: 'approved' });
    res.json({ totalHomes: homesCount, totalShops: shopsCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
