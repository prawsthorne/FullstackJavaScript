const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`)
});

// app.set('view engine', 'ejs');

/*
app.use((req, res, next) => {
    console.log(`host: ${req.hostname}, path: ${req.originalUrl}`);
    next();
});
*/

app.get('/', (req, res) => {
/*
    fs.readFile(path.join(__dirname, './views/index.html' ), (error, data) => {
        if(error) console.log(error);
        else res.end(data);
    });
*/
    res.sendFile(path.join(__dirname, './views/index.html' ));
 //   res.render('index');
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, './views/about.html' ));
 //   res.render('about');
});

app.get('/create', auth, (req, res) => {
    console.log(`admin is: ${req.admin}.`);
    res.sendFile(path.join(__dirname, './views/create.html' ));
//    res.render('create');
});

app.use((req, res) => {
    res.status(404);
    res.sendFile(path.join(__dirname, './views/404.html' ));
//    res.status(404).render('404');
});

function auth(req, res, next) {
    if(req.query.admin === 'true') {
        req.admin = true;
        next();
    } else {
        res.send('no auth.')
    }
}