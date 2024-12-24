const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.get('/signup', (req, res) => res.render('signup',{error:  null}));
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    res.status(400).render('signup', { error: 'User already exists' });
  }
});
router.get('/login', (req, res) => res.render('login',{error_message: null}));
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).render('login', { error_message: 'Invalid username or password' });
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).render('login', { error_message: 'Invalid username or password' });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    req.session.token = token; // Store the token in the session
    res.redirect('/tasks');
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).render('login', { error_message: 'Internal Server Error' });
  }
});
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Could not log out');
    res.redirect('/');
  });
});

module.exports = router;
