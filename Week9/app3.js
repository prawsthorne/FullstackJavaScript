const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

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