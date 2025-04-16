const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.json({ success: false, message: 'User already exists' });
  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashed });
  await newUser.save();
  res.json({ success: true, user: newUser });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.json({ success: false });
  res.json({ success: true, user });
});

module.exports = router;
