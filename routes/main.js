const express = require("express")
const router = express.Router()

router.get('/', function (req, res, next) {
    res.render('index.ejs')
});

router.get('/about', function (req, res, next) {
    res.render('about.ejs')
});

module.exports = router;
