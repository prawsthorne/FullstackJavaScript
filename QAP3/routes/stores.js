const express = require('express');
const router = express.Router();

router.use(express.static('public'));

const storesDal = require('../services/stores.dal')
const languageDal = require('../services/languages.dal')

router.get('/', async (req, res) => {
    let stores = await storesDal.getStores();
    if (stores.length === 0)
        res.render('norecord');
    else {
        res.render('stores.ejs', {stores});
    }
});

router.get('/:id', async (req, res) => {
    var store = await storesDal.getStoreById(req.params.id);
    var languages = await languageDal.getLanguages();
    // var languages = [{name:'English'},{name:'German'},{name:'French'}];
    languages.unshift({name:'All'});

    if (req.query.language) {
      var revenue = await storesDal.getLangRevenueByStoreIdLanguage(req.params.id, req.query.language);
        // var revenue = [{title: 'Fat Cat', monies: 78.90},
        //    {title: 'Greatest', monies: 114.45},
        //    {title: 'Testing is good', monies: 67.80}];
    } else {
      var revenue = await storesDal.getLangRevenueByStoreId(req.params.id);
        // var revenue = [{name:'French', title: 'Spiderman', monies: 780.90},
        //     {name:'English', title: 'Greatest Wonder', monies: 234.45},
        //     {name:'German', title: 'Good Enough', monies: 125.80}];  
    };

    if (store.length === 0)
        res.render('norecord');
    else {
        res.render('storedetails.ejs', {store, languages, revenue, language: req.query.language});
    };
});

module.exports = router