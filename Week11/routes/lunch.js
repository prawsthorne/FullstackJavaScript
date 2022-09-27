const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.write('eat lunch');
    res.end();
});

router.get('/chips', (req, res) => {
    res.write('eat chips');
    res.end();
});



module.exports = router