const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.render('index', { error_message: null }); // Initialize error_message as null
});
// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        
        // Check if user exists and if the password is valid
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('index', { error_message: 'Invalid username or password' });
        }

        // If authentication is successful, create a token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        req.session.token = token; // Store the token in the session
        res.redirect('/tasks');
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.render('index', { error_message: 'An error occurred during login' });
    }
});

module.exports = router;