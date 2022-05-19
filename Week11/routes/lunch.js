const express = require('express');
const router = express.Router();

router.get('/lunch/', (req, res) => {
    res.write('eat lunch');
    res.end();
});

router.get('/lunch/chips', (req, res) => {
    res.write('eat chips');
    res.end();
});

module.exports = router