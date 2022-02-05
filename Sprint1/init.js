/*************************
 * File Name: init.js
 * Purpose: The routines to initialize the app
 * 
 * Commands:
myapp init all      creates the folder structure and config file
myapp init mk       creates the folder structure
myapp init cat      creates the config file with default settings
 *
 * Created Date: 09 Jan 2022
 * Authors:
 * PJR - Peter Rawsthorne
 * Revisions:
 * Date, Author, Description
 * 09 Jan 2022, PJR, File created
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

const {folders, config, init} = require('./templates')

const myArgs = process.argv.slice(2);
//Use this line of code to send the 3rd and beyond args to the console 
//if(myArgs.length > 1) console.log('the init.args: ', myArgs);

function createFolders() {
    if(DEBUG) console.log('init.createFolders()');
    let mkcount = 0;
    folders.forEach(element => {
        if(DEBUG) console.log(element);
        try {
            if(!fs.existsSync(path.join(__dirname, element))) {
                fsPromises.mkdir(path.join(__dirname, element));
                mkcount++;
            }
        } catch (err) {
            console.log(err);
        }
    });
    if(mkcount === 0) {
        if(DEBUG) console.log('All folders already exist.');
        myEmitter.emit('log', 'init.createFolders()', 'INFO', 'All folders already existed.');
    } else if (mkcount <= folders.length) {
        if(DEBUG) console.log(mkcount + ' of ' + folders.length + ' folders were created.');
        myEmitter.emit('log', 'init.createFolders()', 'INFO', mkcount + ' of ' + folders.length + ' folders already existed.');
    } else {
        if(DEBUG) console.log('All folders successfully created.');
        myEmitter.emit('log', 'init.createFolders()', 'INFO', 'All folders successfully created.');
    }
};

function createFiles() {
    if(DEBUG) console.log('init.createFiles()');
    try {
        let data = JSON.stringify(config, null, 2);
        if(!fs.existsSync(path.join(__dirname, 'config.json'))) {
            fs.writeFile('config.json', data, (err) => {
                if(DEBUG) console.log('Data written to config file');
                myEmitter.emit('log', 'init.createFiles()', 'INFO', 'config.json successfully created.');
            });
        } else {
            myEmitter.emit('log', 'init.createFiles()', 'INFO', 'config.json already exists.'); 
        }
    } catch(err) {
        console.log(err);
    }
};

function initializeApp() {
    if(DEBUG) 
        console.log('initializeApp()');
    myEmitter.emit('log', 'init.initializeApp()', 'INFO', 'init option was called by CLI');

    switch (myArgs[1]) {
    case 'all':
    case 'a':
        createFolders();
        createFiles();
        break;
    case 'cat':
        createFiles();
        break;
    case 'mk':
        createFolders();
        break;
    default:
        fs.readFile(__dirname + "/views/init.txt", (error, data) => {
            if(error) throw error;              
            console.log(data.toString());
        });
        myEmitter.emit('log', 'init.initializeApp()', 'INFO', 'invalid CLI option, usage displayed');
    }
}

module.exports = {
    initializeApp,
  }