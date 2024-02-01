const express = require('express');
const router = express.Router();
const path = require('path');

// get request whenever to address / or /index or /index.html
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html')) // send the index.html file.
})

module.exports = router