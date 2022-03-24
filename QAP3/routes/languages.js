const express = require('express');
const router = express.Router();

router.use(express.static('public'));

const languagesDal = require('../services/languages.dal')

router.get('/', async (req, res) => {
 //   console.log(req.method);
    let languages = await languagesDal.getLanguages();
    if (languages.length === 0)
        res.render('norecord');
    else {
        res.render('languages.ejs', {languages, theLanguage: 'New'});
    }
});

router.get('/:id/edit', async (req, res) => {
//    console.log(req.params.id);
    res.render('languagePatch.ejs', {theLanguage: req.query.language, theId: req.params.id});
});

router.get('/:id/delete', async (req, res) => {
//    console.log(req.params.id);
    res.render('languageDelete.ejs', {theLanguage: req.query.language, theId: req.params.id});
});

router.get('/:id/replace', async (req, res) => {
        console.log('Replace : ' + req.params.id);
        res.render('languagePut.ejs', {theLanguage: req.query.language, theId: req.params.id});
    });

router.post('/', async (req, res) => {
    await languagesDal.addLanguage(req.body.language);
    res.redirect('/languages/');
});

// PUT, PATCH, and DELETE are part of HTTP, not a part of HTML
// Therefore, <form method="PUT" ...> doesn't work, but it does work for RESTful API

router.put('/:id', async (req, res) => {
    console.log('put: ' + req.params.id);
    await languagesDal.putLanguage(req.params.id, req.body.language);
    res.redirect('/languages/');
});

router.patch('/:id', async (req, res) => {
    console.log('patch: ' + req.params.id + ' = ' + req.body.language);
    await languagesDal.patchLanguage(req.params.id, req.body.language);
    res.redirect('/languages/');
});

router.delete('/:id', async (req, res) => {
//    console.log('delete: ' + req.params.id);
    await languagesDal.deleteLanguage(req.params.id);
    res.redirect('/languages/');
});

module.exports = router