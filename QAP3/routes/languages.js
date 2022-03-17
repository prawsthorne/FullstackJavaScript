const express = require('express');
const router = express.Router();

router.use(express.static('public'));

const languagesDal = require('../services/languages.dal')

router.get('/', async (req, res) => {
    console.log(req.method);
    let languages = await languagesDal.getLanguages();
    if (languages.length === 0)
        res.render('norecord');
    else {
        res.render('languages.ejs', {languages, theLanguage: 'New'});
    }
});

router.get('/:id/edit', async (req, res) => {
//    console.log(req.params.id);
    res.render('languageEdit.ejs', {theLanguage: req.query.language, theId: req.params.id});
});

router.get('/:id/delete', async (req, res) => {
//    console.log(req.params.id);
    res.render('languageDelete.ejs', {theLanguage: req.query.language, theId: req.params.id});
});

router.post('/', async (req, res) => {
    await languagesDal.addLanguage(req.body.language);
    res.redirect('/languages/');
});

router.patch('/', async (req, res) => {
    console.log('patch: ' + req.params.id);
 //   await languagesDal.patchLanguage(req.params.id);
    res.redirect('/languages/');
});

router.delete('/', async (req, res) => {
    console.log('delete: ' + req.params.id);
 //   await languagesDal.deleteLanguage(req.params.id);
    res.redirect('/languages/');
});


module.exports = router