// Add loggin to the CLI project by using eventLogging
// load the logEvents module
const logEvents = require('./logEvents');

// define/extend an EventEmitter class
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};

// initialize an new emitter object
const myEmitter = new MyEmitter();
// add the listener for the logEvent
myEmitter.on('log', (event, level, msg) => logEvents(event, level, msg));

const fs = require("fs");

const myArgs = process.argv.slice(2);
//Use this line of code to send the 3rd and beyond args to the console 
//if(myArgs.length > 1) console.log('the init.args: ', myArgs);

function listFolders() {
    if(DEBUG) 
        console.log('listFolders()');

}

function listFiles() {
    if(DEBUG) 
        console.log('listFiles()');

}

function createFolders() {
    if(DEBUG) 
        console.log('createFolders()');

}

function createFiles() {
    if(DEBUG) 
        console.log('createFiles()');

}

function initializeApp() {
    if(DEBUG) 
        console.log('initializeApp()');
    myEmitter.emit('log', 'initializeApp()', 'INFO', 'init option was called by CLI');

    switch (myArgs[1]) {
    case 'dir':
    case 'd':
        listFolders();
        break;
    case 'ls':
        listFiles();
        break;
    default:
        fs.readFile(__dirname + "/usage.txt", (error, data) => {
            if(error) throw error;              
            console.log(data.toString());
        });
        myEmitter.emit('log', 'initializeApp()', 'INFO', 'invalid CLI option, usage displayed');
    }
}

module.exports = {
    listFolders,
    listFiles,
    createFolders,
    createFiles,
    initializeApp,
  }