const express = require('express');
const router = express.Router();
const { getBestActress } = require('../services/actress.dal')

router.use(express.static('public'));
// the root of /actress is now /
router.get('/', (req, res) => {
    res.send('All Actress.');
});

// from http browser it has /actress/new
router.get('/new', (req, res) => {
    res.send('Actress New.');
});

router.get('/best', async (req, res) => {
    // const bestactress = [
    //     {actor: 'Youn Yuh-jung', film: 'Minari'},
    //     {actor: 'Laura Dern', film: 'Marriage Story'},
    //     {actor: 'Regina King', film: 'If Beale Street Could Talk'}
    // ];
    let bestactress = await getBestActress(); // from postgresql
    res.render('actress', {bestactress});
});

module.exports = router