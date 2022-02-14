/*************************
 * File Name: config.js
 * Purpose: The routines to configure the app
 * 
 * Commands:
myapp config --show     displays a list of the current config settings
myapp config --reset    resets the config file with default settings
myapp config --set      sets a specific config setting
 *
 * Created Date: 12 Feb 2022
 * Authors:
 * PJR - Peter Rawsthorne
 * Revisions:
 * Date, Author, Description
 * 12 Feb 2022, PJR, File created
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

function displayConfig() {
    if(DEBUG) console.log('config.displayConfig()');
}

function resetConfig() {
    if(DEBUG) console.log('config.resetConfig()');
}

function setConfig() {
    if(DEBUG) console.log('config.setConfig()');
}

function configApp() {
    if(DEBUG) console.log('configApp()');
    myEmitter.emit('log', 'config.configApp()', 'INFO', 'config option was called by CLI');

    switch (myArgs[1]) {
    case '--show':
        displayConfig();
        break;
    case '--reset':
        resetConfig();
        break;
    case '--set':
        setConfig();
        break;
    case '--help':
    case '--h':
    default:
        fs.readFile(__dirname + "/views/config.txt", (error, data) => {
            if(error) throw error;              
            console.log(data.toString());
        });
        myEmitter.emit('log', 'config.configApp()', 'INFO', 'invalid CLI option, usage displayed');
    }
}

module.exports = {
    configApp,
  }