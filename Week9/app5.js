//const fs = require('fs');
//const path = require('path');
const express = require('express');
//const morgan = require('morgan')
const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
//app.use(morgan('short'));
app.use(express.urlencoded({ extended: false }));

const actressRouter = require('./routes/actress')
const awardsRouter = require('./routes/awards')

app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`)
});

app.get('/', async (req, res) => {
    res.render('index');
});
app.get('/about', async (req, res) => {
    res.render('about');
});

app.get('/create', auth, async (req, res) => {
    console.log(`admin is: ${req.admin}.`);
    res.render('create');
});

app.use('/actress', actressRouter);
app.use('/awards', awardsRouter);

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