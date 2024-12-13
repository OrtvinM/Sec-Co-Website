const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql2');
const session = require('express-session');

const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'somerandomstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'osportfoliouser',
    password: 'qwertyuiop',
    database: 'os-portfolio'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1);
    }
});

global.db = db;

app.locals.siteData = { siteName: "Sec Co - Ortvin M Portfolio project" };

const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

const projectsRoutes = require('./routes/projects');
app.use('/projects', projectsRoutes);

const apiRoutes = require('./routes/api'); 
app.use('/api', apiRoutes);            

app.listen(port, () => console.log(`Node app listening on port ${port}!`));
