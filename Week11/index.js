const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { name: 'Peter'});
});

const awardsRouter = require('./routes/awards')

app.use('/awards', awardsRouter);

app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`)
});