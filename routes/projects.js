const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get('/', async function (req, res, next) {
    const username = "OrtvinM"; // GitHub username

    // Query local database for projects and associated user names
    const sqlquery = `
        SELECT 
            projects.projectName, 
            projects.GitLink, 
            CONCAT(users.firstName, ' ', users.lastName) AS connectedUser 
        FROM projects
        LEFT JOIN views ON projects.idProjects = views.projectID
        LEFT JOIN users ON views.userID = users.idusers
    `;

    db.query(sqlquery, async (err, dbResults) => {
        if (err) {
            return res.render("projects.ejs", {
                dbResults: [],
                githubResults: [],
                error: "Error querying the database"
            });
        }

        try {
            // Fetch GitHub projects
            const response = await axios.get(`https://api.github.com/users/${username}/repos`);
            const githubProjects = response.data;

            res.render("projects.ejs", {
                dbResults,
                githubResults: githubProjects,
                error: null
            });
        } catch (error) {
            console.error("Error fetching GitHub projects:", error.message);
            res.render("projects.ejs", {
                dbResults,
                githubResults: [],
                error: "Failed to fetch GitHub projects"
            });
        }
    });
});

module.exports = router;
