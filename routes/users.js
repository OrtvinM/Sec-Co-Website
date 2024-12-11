const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt'); 
const saltRounds = 10; 

router.get('/login', function (req, res, next) {
    res.render('login.ejs');
});

// Render the registration page
router.get('/register', function (req, res, next) {
    res.render('register.ejs');
});

// Handle user registration
router.post('/register', function (req, res, next) {
    const plainPassword = req.body.password;
    const username = req.body.username;
    const firstName = req.body.first;
    const lastName = req.body.last;
    const email = req.body.email;

    // Hash the password
    bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).send('Error hashing password');
        }

        const insertUserQuery = `
            INSERT INTO users (userName, firstName, lastName, email, hashed_password) 
            VALUES (?, ?, ?, ?, ?)
        `;

        // Insert the new user into the database
        db.query(insertUserQuery, [username, firstName, lastName, email, hashedPassword], function (err) {
            if (err) {
                console.error('Error inserting user into database:', err);
                return res.status(500).send('Error saving user to the database. Ensure the username or email is not already in use.');
            }

            // Confirmation message after successful registration
            res.send(`Hello ${firstName} ${lastName}, you are now registered!`);
        });
    });
});

router.post('/registered', function (req, res, next) {
    const plainPassword = req.body.password;
    const username = req.body.username;
    const firstName = req.body.first;
    const lastName = req.body.last;
    const email = req.body.email;

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
                return res.status(500).send('Error saving user to the database');
            }

            let result = `Hello ${firstName} ${lastName}, you are now registered! We will send an email to you at ${email}.`;
            result += ` Your password is: ${plainPassword} and your hashed password is: ${hashedPassword}`;
            res.send(result);
        });
    });
});

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

router.post('/loggedin', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

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
                res.send(`Login successful! Welcome back, ${username}.`);
            } else {
                res.send('Login failed: Incorrect password');
            }
        });
    });
});

module.exports = router;
