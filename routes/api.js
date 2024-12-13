const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
    const query = `
        SELECT users.userName, users.email, 
               CASE WHEN projects.GitLink IS NOT NULL THEN 'Yes' ELSE 'No' END AS hasGitLink
        FROM users
        LEFT JOIN views ON users.idusers = views.userID
        LEFT JOIN projects ON views.projectID = projects.idProjects
    `;

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving data' });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;
