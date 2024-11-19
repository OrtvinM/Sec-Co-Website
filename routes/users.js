// Create a new router
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt'); // Add this line here to include bcrypt for hashing
const saltRounds = 10; // Define salt rounds for password hashing

router.get('/register', function (req, res, next) {
    res.render('register.ejs');
});

router.post('/registered', function (req, res, next) {
    const plainPassword = req.body.password; // Get the plain password from the form input
    // Hash the password before saving to the database
    bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
        if (err) {
            // Handle error during hashing
            return next(err);
        }
        res.send('Hello ' + req.body.first + ' ' + req.body.last + ' you are now registered! We will send an email to you at ' + req.body.email);
    });
});
// Export the router object so index.js can access it
module.exports = router;