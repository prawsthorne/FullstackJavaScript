const express = require('express');
const router = express.Router();

const { getAwardsByStoreId } = require('../services/awards.dal')

router.get('/:id', async (req, res) => {
    let awards = await getAwardsByStoreId(req.params.id);
// array with mock data for testing and UI development
// const awards = [
//     {film_id: '1', title: 'Minari', release_year: '2012', rating: 'G', name: 'Golden Globe', store_id: '2'},
//     {film_id: '2', title: 'Small Feet', release_year: '2006', rating: 'PG', name: 'Academy Award', store_id: '2'},
//     {film_id: '3', title: 'Road Warrior', release_year: '2017', rating: 'R', name: 'Golden Globe', store_id: '2'}
// ];
    res.render('awards',{awards});
});

module.exports = router