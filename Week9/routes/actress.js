const express = require('express');
const router = express.Router();

router.use(express.static('public'));

router.get('/', (req, res) => {
    res.send('All Actress.');
});

router.get('/new', (req, res) => {
    res.send('Actress New.');
});

router.get('/best', (req, res) => {
    const bestactress = [
        {actor: 'Youn Yuh-jung', film: 'Minari'},
        {actor: 'Laura Dern', film: 'Marriage Story'},
        {actor: 'Regina King', film: 'If Beale Street Could Talk'}
    ];
    res.render('actress', {bestactress});
});

module.exports = router