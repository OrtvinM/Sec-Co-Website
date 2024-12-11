const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt'); 
const saltRounds = 10; 

router.get('/register', function (req, res, next) {
    res.render('register.ejs');
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

module.exports = router;
