// Import express and ejs
const express = require('express');
const ejs = require('ejs');

// Import mysql2 module
const mysql = require('mysql2');

// Import session module
const session = require('express-session');

// Create the express application object
const app = express();
const port = 8000;

const expressSanitizer = require('express-sanitizer');
var validator = require ('express-validator');

app.use(expressSanitizer());
// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Set up the body parser
app.use(express.urlencoded({ extended: true }));

// Set up public folder (for CSS and static JS)
app.use(express.static(__dirname + '/public'));

// Create a session
app.use(session({
    secret: 'BackwardsDucksGoThirteenMaybeStation',
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
        console.error('Ensure the MySQL credentials are correct and the MySQL service is running.');
        process.exit(1); 
    } else {
        console.log('Connected to database');
    }
});

global.db = db;

// Define our application-specific data
app.locals.siteData = { siteName: "Sec Co - Ortvin M Portfolio project" };

// Load the route handlers
const mainRoutes = require("./routes/main");
app.use('/', mainRoutes);

// Load the route handlers for /users
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

// Load the route handlers for /projects
const projectsRoutes = require('./routes/projects');
app.use('/projects', projectsRoutes);

// Start the web app listening
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
