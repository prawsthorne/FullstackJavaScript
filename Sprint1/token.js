/*************************
 * File Name: config.js
 * Purpose: The routines to configure the app
 * 
 * Commands:
myapp token --count             displays a count of the token created
myapp token --new <username>    generates a token for a given username, saves tokens to the json file
myapp token --fetch <username>  fetches a token for a given username
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
}

function newToken() {
    if(DEBUG) console.log('token.newToken()');
}

function fetchToken() {
    if(DEBUG) console.log('token.fetchToken()');
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
    case '--fetch':
        fetchToken();
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