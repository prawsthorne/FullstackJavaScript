const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan')
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(morgan('short'));

app.set('view engine', 'ejs');
const actressRouter = require('./routes/actress')

app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`)
});

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/create', auth, (req, res) => {
    console.log(`admin is: ${req.admin}.`);
    res.render('create');
});

app.use('/actress', actressRouter);

app.use((req, res) => {
    res.status(404).render('404');
});

function auth(req, res, next) {
    if(req.query.admin === 'true') {
        req.admin = true;
        next();
    } else {
        res.send('no auth.')
    }
}