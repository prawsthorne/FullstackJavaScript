/*************************
 * File Name: token.js
 * Purpose: The routines to configure the app
 * 
 * Commands:
myapp token --count                     displays a count of the tokens created
myapp token --new <username>            generates a token for a given username, saves tokens to the json file
myapp token --fetch <username>          fetches a user record for a given username
 *
 * Created Date: 14 Feb 2022
 * Authors:
 * PJR - Peter Rawsthorne
 * Revisions:
 * Date, Author, Description
 * 14 Feb 2022, PJR, File created
 *
 *************************/
global.DEBUG = false;
// Node.js common core global modules
const fs = require('fs');
const path = require('path');

const crc32 = require('crc/crc32');
const { format } = require('date-fns');

const myArgs = process.argv.slice(2);

function tokenCount() {
    if(DEBUG) console.log('token.tokenCount()');
    fs.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
        if(error) throw error; 
        let tokens = JSON.parse(data);
        let cnt = Object.keys(tokens).length;
        console.log(`Current token count is ${cnt}.`);
    });
};

function newToken(username) {
    if(DEBUG) console.log('token.newToken()');

    let newToken = JSON.parse(`{
        "created": "1969-01-31 12:30:00",
        "username": "username",
        "email": "user@example.com",
        "phone": "5556597890",
        "token": "token",
        "expires": "1969-02-03 12:30:00",
        "confirmed": "tbd"
    }`);

    let now = new Date();
    let expires = addDays(now, 3);

    newToken.created = `${format(now, 'yyyy-MM-dd HH:mm:ss')}`;
    newToken.username = username;
    newToken.token = crc32(username).toString(16);
    newToken.expires = `${format(expires, 'yyyy-MM-dd HH:mm:ss')}`;

    fs.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
        if(error) throw error; 
        let tokens = JSON.parse(data);
        tokens.push(newToken);
        userTokens = JSON.stringify(tokens);
        if(DEBUG) console.log(newToken);
    
        fs.writeFile(__dirname + '/json/tokens.json', userTokens, (err) => {
            if (err) console.log(err);
            else { 
                console.log(`New token ${newToken.token} was created for ${username}.`);
            }
        });
    }); 
    return newToken.token;
}

function fetchRecord(username) {
    if(DEBUG) console.log('token.fetchRecord()');
    fs.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
        if(error) throw error; 
        let tokens = JSON.parse(data);
        tokens.forEach(obj => {
            if(obj.username === username) {
                console.log(obj);
            }
        });
    });
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function tokenApp() {
    if(DEBUG) console.log('tokenApp()');

    switch (myArgs[1]) {
    case '--count':
        tokenCount();
        break;
    case '--new':
        newToken(myArgs[2]);
        break;
    case '--fetch':
        fetchRecord(myArgs[2]);
        break;
    case '--help':
    case '--h':
    default:
        fs.readFile(__dirname + "/views/token.txt", (error, data) => {
            if(error) throw error;              
            console.log(data.toString());
        });
    }
}

//tokenApp();

module.exports = {
    newToken,
  }