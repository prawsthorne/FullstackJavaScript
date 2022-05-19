const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'Peter'});
});

const awardsRouter = require('./routes/awards')
const lunchRouter = require('./routes/lunch')

app.use('/awards', awardsRouter);
app.use('/lunch', lunchRouter);

app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`)
});