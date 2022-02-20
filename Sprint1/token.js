/*************************
 * File Name: config.js
 * Purpose: The routines to configure the app
 * 
 * Commands:
myapp token --count                     displays a count of the tokens created
myapp token --new <username>            generates a token for a given username, saves tokens to the json file
myapp token --upd p <username> <phone>  updates the json entry with phone number
myapp token --upd e <username> <email>  updates the json entry with email
myapp token --search u <username>       fetches a token for a given username
myapp token --search e <email>          fetches a token for a given email
myapp token --search p <phone>          fetches a token for a given phone number
 *
 * Created Date: 14 Feb 2022
 * Authors:
 * PJR - Peter Rawsthorne
 * Revisions:
 * Date, Author, Description
 * 14 Feb 2022, PJR, File created
 *
 *************************/
// Add logging to the CLI project by using eventLogging
// load the logEvents module
const logEvents = require('./logEvents');

// define/extend an EventEmitter class
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};

// initialize an new emitter object
const myEmitter = new MyEmitter();
// add the listener for the logEvent
myEmitter.on('log', (event, level, msg) => logEvents(event, level, msg));

// Node.js common core global modules
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const myArgs = process.argv.slice(2);

function tokenCount() {
    if(DEBUG) console.log('token.tokenCount()');
    let cnt = 0;
    myEmitter.emit('log', 'token.tokenCount()', 'INFO', `Current token count is ${cnt}.`);
}

function newToken() {
    if(DEBUG) console.log('token.newToken()');
    let tkn = 'yks0b4';
    let user = 'HitMonkey';
    myEmitter.emit('log', 'token.newToken()', 'INFO', `New token ${tkn} was created for ${user}.`);
}

function updateToken() {
    if(DEBUG) console.log('token.updateToken()');
    myEmitter.emit('log', 'token.updateToken()', 'INFO', `Token record was successfully updated.`);
}

function searchToken() {
    if(DEBUG) console.log('token.searchToken()');
    myEmitter.emit('log', 'token.searchToken()', 'INFO', `Token record was found.`);
}

function tokenApp() {
    if(DEBUG) console.log('tokenApp()');
    myEmitter.emit('log', 'token.tokenApp()', 'INFO', 'config option was called by CLI');

    switch (myArgs[1]) {
    case '--count':
        tokenCount();
        break;
    case '--new':
        newToken();
        break;
    case '--upd':
        updateToken();
        break;
    case '--search':
        searchToken();
        break;
    case '--help':
    case '--h':
    default:
        fs.readFile(__dirname + "/views/token.txt", (error, data) => {
            if(error) throw error;              
            console.log(data.toString());
        });
        myEmitter.emit('log', 'token.tokenApp()', 'INFO', 'invalid CLI option, usage displayed');
    }
}

module.exports = {
    tokenApp,
  }