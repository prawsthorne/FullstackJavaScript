const express = require('express');
const router = express.Router();
const { getAwards, getAwardsByFilmId } = require('../services/awards.dal')

router.use(express.static('public'));

router.get('/', async (req, res) => {
    let awards = await getAwards();
    res.render('awards',{awards});
});

router.get('/:id', async (req, res) => {
    let awards = await getAwardsByFilmId(req.params.id);
    res.render('filmawards', {awards});
});

router.put('/:id', async (req, res) => {
    res.send('Update Award.');
});

router.post('/new', async (req, res) => {
    res.send('New Award.');
});

router.delete('/:id', async (req, res) => {
    res.send('Delete Award.');
});

module.exports = router