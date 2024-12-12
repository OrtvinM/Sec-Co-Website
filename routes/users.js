const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt'); 
const saltRounds = 10; 
const { check, validationResult } = require('express-validator');
const expressSanitizer = require('express-sanitizer');
require('dotenv').config();
const axios = require('axios');

router.use(expressSanitizer()); // Add sanitizer middleware

// Redirect if not logged in
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('./login');
    } else {
        next();
    }
};

// Render login page
router.get('/login', function (req, res, next) {
    res.render('login.ejs');
});

// Render registration page
router.get('/register', function (req, res, next) {
    res.render('register.ejs', { errors: [] });
});

// Handle user registration
router.post('/register', [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('username').notEmpty().withMessage('Username cannot be empty'),
    check('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number'),
    check('first').notEmpty().withMessage('First name cannot be empty'),
    check('last').notEmpty().withMessage('Last name cannot be empty')
], function (req, res, next) {
    const plainPassword = req.body.password + process.env.PASSWORD_PEPPER; // Append pepper to password
    const username = req.sanitize(req.body.username);
    const firstName = req.sanitize(req.body.first);
    const lastName = req.sanitize(req.body.last);
    const email = req.sanitize(req.body.email);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        return res.render('register.ejs', { errors: errorMessages });
    }

    bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).send('Error hashing password');
        }

        const insertUserQuery = `
            INSERT INTO users (userName, firstName, lastName, email, hashed_password) 
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(insertUserQuery, [username, firstName, lastName, email, hashedPassword], function (err) {
            if (err) {
                console.error('Error inserting user into database:', err);
                return res.render('register.ejs', { errors: ['Error saving user to the database. Ensure the username or email is not already in use.'] });
            }

            res.send(`Hello ${firstName} ${lastName}, you are now registered!`);
        });
    });
});


// Handle login
router.post('/loggedin', function (req, res, next) {
    const username = req.sanitize(req.body.username);
    const password = req.body.password + process.env.PASSWORD_PEPPER; // Append pepper to password

    const selectUserQuery = `
        SELECT hashed_password 
        FROM users 
        WHERE userName = ?
    `;

    db.query(selectUserQuery, [username], function (err, rows) {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send('Error retrieving user data');
        }

        if (rows.length === 0) {
            return res.send('Login failed: User does not exist');
        }

        const hashedPassword = rows[0].hashed_password;

        bcrypt.compare(password, hashedPassword, function (err, result) {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).send('Error comparing passwords');
            }

            if (result === true) {
                req.session.userId = username;
                res.send(`Login successful! Welcome back, ${username}.`);
            } else {
                res.send('Login failed: Incorrect password');
            }
        });
    });
});


// Registered users
router.get('/list', function (req, res, next) {
    const selectUsersQuery = `
        SELECT userName, firstName, lastName, email 
        FROM users
    `;

    db.query(selectUsersQuery, function (err, rows) {
        if (err) {
            console.error('Error retrieving user list:', err);
            return res.status(500).send('Error retrieving user list');
        }
        res.render('userlist.ejs', { users: rows });
    });
});

// Logged-in users (requires login)
router.get('/loggedin', redirectLogin, function (req, res, next) {
    const selectUsersQuery = `
        SELECT userName, firstName, lastName, email 
        FROM users
    `;

    db.query(selectUsersQuery, function (err, rows) {
        if (err) {
            console.error('Error retrieving user list:', err);
            return res.status(500).send('Error retrieving user list');
        }
        res.render('userlist.ejs', { users: rows });
    });
});

// Profile page (requires login)
router.get('/profile', redirectLogin, async function (req, res, next) {
    const username = req.session.userId; 
    const selectUserQuery = `
        SELECT userName, firstName, lastName, email 
        FROM users 
        WHERE userName = ?
    `;

    db.query(selectUserQuery, [username], async function (err, rows) {
        if (err) {
            console.error('Error retrieving user data:', err);
            return res.status(500).send('Error retrieving user data');
        }

        if (rows.length === 0) {
            return res.render('profile.ejs', { error: 'User not found', user: null, imageUrl: null });
        }

        const user = rows[0];

        let imageUrl = null;
        try {
            const response = await axios.get('https://picsum.photos/300/300', { responseType: 'arraybuffer' });
            imageUrl = `data:image/jpeg;base64,${Buffer.from(response.data).toString('base64')}`;
        } catch (apiError) {
            console.error('Error fetching nature image:', apiError.message);
            imageUrl = null; 
        }
        res.render('profile.ejs', { error: null, user, imageUrl });
    });
});
// Logout route
router.get('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('./');
        }
        res.send('You are now logged out. <a href="../">Home</a>');
    });
});

module.exports = router;
