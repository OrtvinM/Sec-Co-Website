const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql2');
const session = require('express-session');

// Create the express application object
const app = express();
const port = 8000;

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Set up the body parser
app.use(express.urlencoded({ extended: true }));

// Set up public folder (for CSS and static JS)
app.use(express.static(__dirname + '/public'));

// Create a session
app.use(session({
    secret: 'somerandomstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// Define the database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'os-portfolio_app',
    password: 'qwertyuiop',
    database: 'os-portfolio'
});

// Connect to the database 
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1);
    }
});

global.db = db;

// Define our application-specific data
app.locals.siteData = { siteName: "Sec Co - Ortvin M Portfolio project" };

// Load the route handlers
const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

// Ensure this is declared only once
const projectsRoutes = require('./routes/projects');
app.use('/projects', projectsRoutes);

// Start the web app listening
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
