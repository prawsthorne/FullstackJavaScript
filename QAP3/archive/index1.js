const express = require('express');
const app = express();
//const session = require('express-session');
const methodOverride = require('method-override')

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, }));
/*
app.use(session({
    secret: 'cape broyle',
    resave: false,
    saveUninitialized: true,
}));
*/
app.use(methodOverride('_method'));

app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`)
});

app.set('view engine', 'ejs');

const storesRouter = require('./routes/stores')
const languagesRouter = require('./routes/languages')

app.use('/stores', storesRouter);
app.use('/languages', languagesRouter);

app.use((req, res) => {
    res.status(404).render('404');
});