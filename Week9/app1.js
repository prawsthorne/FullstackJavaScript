const fs = require('fs');
const path = require('path');
const express = require('express');
const res = require('express/lib/response');
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`)
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/actress', (req, res) => {
    res.render('actress');
});

app.get('/create', (req, res) => {
    console.log(`admin is: ${req.admin}.`);
    res.render('create');
});

app.use((req, res, next) => {
    res.status(404);
    res.render('404');
});
