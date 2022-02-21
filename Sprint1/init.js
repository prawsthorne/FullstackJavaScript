/*************************
 * File Name: init.js
 * Purpose: The routines to initialize the app
 * 
 * Commands:
myapp init --all      creates the folder structure and config file
myapp init --mk       creates the folder structure
myapp init --cat      creates the config file with default settings
 *
 * Created Date: 09 Jan 2022
 * Authors:
 * PJR - Peter Rawsthorne
 * Revisions:
 * Date, Author, Description
 * 09 Jan 2022, PJR, File created
 * 12 Feb 2022, PJR, added createFiles() for init, config, and token views
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

const {folders, configjson, tokenjson, inittxt, usagetxt, configtxt, tokentxt} = require('./templates')

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
        myEmitter.emit('log', 'init.createFolders()', 'INFO', mkcount + ' of ' + folders.length + ' folders needed to be created.');
    } else {
        if(DEBUG) console.log('All folders successfully created.');
        myEmitter.emit('log', 'init.createFolders()', 'INFO', 'All folders successfully created.');
    }
};

function createFiles() {
    if(DEBUG) console.log('init.createFiles()');
    try {
        let configdata = JSON.stringify(configjson, null, 2);
        if(!fs.existsSync(path.join(__dirname, './json/config.json'))) {
            fs.writeFile('./json/config.json', configdata, (err) => {
                if(DEBUG) console.log('Data written to config file');
                myEmitter.emit('log', 'init.createFiles()', 'INFO', 'config.json successfully created.');
            });
        } else {
            myEmitter.emit('log', 'init.createFiles()', 'INFO', 'config.json already exists.'); 
        }
        let tokendata = JSON.stringify(tokenjson, null, 2);
        if(!fs.existsSync(path.join(__dirname, './json/tokens.json'))) {
            fs.writeFile('./json/tokens.json', tokendata, (err) => {
                if(DEBUG) console.log('Data written to token file');
                myEmitter.emit('log', 'init.createFiles()', 'INFO', 'tokens.json successfully created.');
            });
        } else {
            myEmitter.emit('log', 'init.createFiles()', 'INFO', 'token.json already exists.'); 
        }        
        if(!fs.existsSync(path.join(__dirname, './views/usage.txt'))) {
            fs.writeFile('./views/usage.txt', usagetxt, (err) => {
                if(DEBUG) console.log('Data written to usage.txt file');
                myEmitter.emit('log', 'init.createFiles()', 'INFO', './views/usage.txt successfully created.');
            });
        } else {
            myEmitter.emit('log', 'init.createFiles()', 'INFO', './views/usage.txt already exists.'); 
        }
        if(!fs.existsSync(path.join(__dirname, './views/init.txt'))) {
            fs.writeFile('./views/init.txt', inittxt, (err) => {
                if(DEBUG) console.log('Data written to init.txt file');
                myEmitter.emit('log', 'init.createFiles()', 'INFO', './views/init.txt successfully created.');
            });
        } else {
            myEmitter.emit('log', 'init.createFiles()', 'INFO', './views/init.txt already exists.'); 
        }   
        if(!fs.existsSync(path.join(__dirname, './views/config.txt'))) {
            fs.writeFile('./views/config.txt', configtxt, (err) => {
                if(DEBUG) console.log('Data written to config.txt file');
                myEmitter.emit('log', 'init.createFiles()', 'INFO', './views/config.txt successfully created.');
            });
        } else {
            myEmitter.emit('log', 'init.createFiles()', 'INFO', './views/config.txt already exists.'); 
        }
        if(!fs.existsSync(path.join(__dirname, './views/token.txt'))) {
            fs.writeFile('./views/token.txt', tokentxt, (err) => {
                if(DEBUG) console.log('Data written to token.txt file');
                myEmitter.emit('log', 'init.createFiles()', 'INFO', './views/token.txt successfully created.');
            });
        } else {
            myEmitter.emit('log', 'init.createFiles()', 'INFO', './views/token.txt already exists.'); 
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
    case '--all':
        createFolders();
        createFiles();
        break;
    case '--cat':
        createFiles();
        break;
    case '--mk':
        createFolders();
        break;
    case '--help':
    case '--h':
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