if( process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express')
const uuid = require('uuid')
const bcrypt = require('bcrypt');
const app = express()
//const logins = require('./services/plogins') // use POSTGRESQL dal
const logins = require('./services/mlogins') // use MONGODB dal
const PORT = process.env.PORT || 3000;

//app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({ info: `Node.js and Express API` })
  })

app.get('/logins', async (req, res) => {
    var queryStr = require('url').parse(req.url,true).query;
    if (queryStr.email) {
        var results = await logins.getLoginByEmail(queryStr.email);
    } else {
        var results = await logins.getLogins();
    }
    if ( results == null ) {
        console.log('not found');
    } else {
        res.status(200).json(results);
    }
});
app.get('/logins/:id', async (req, res) => {
    let result = await logins.getLoginById(req.params.id);
    console.log(req.params.id)
    if ( result == null ) {
        console.log('not found');
    } else {
        console.log(result);
        res.json({ info: `login ` + result.username + ` was found.` });
    }
});

app.get('/create', async (req, res) => {
    var queryStr = require('url').parse(req.url,true).query;
    const hashedPassword = await bcrypt.hash(queryStr.password, 10);
    if (queryStr.email && queryStr.username && queryStr.password ) {
        var result = await logins.addLogin(queryStr.username, queryStr.email, hashedPassword, uuid.v4());
    } else {
        console.log('Not enough query string parameters.');
    }

    if ( result == null ) {
        console.log('Unsuccessful in add.');
    } else {
        console.log(result);
        res.json({ info: `New login ` + queryStr.username + ` was created with _id: ` + result });
    }
});

app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`)
});