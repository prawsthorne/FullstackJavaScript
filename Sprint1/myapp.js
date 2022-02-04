/*************************
 * File Name: myapp.js
 * Purpose: The main routines to start the initialization app
 * 
 * Commands:
myapp init all          creates the folder structure and config file
myapp init mk           creates the folder structure
myapp init cat          creates the config file with default settings
myapp config            displays a list of the current config settings
myapp config --reset    resets the config file with default settings
myapp config --set      sets a specific config setting
myapp token             displays a count of the token created
myapp token <username>  generates a token for a given username, saves tokens to the json file
 *
 * Created Date: 09 Jan 2022
 * Authors:
 * PJR - Peter Rawsthorne
 * Revisions:
 * Date, Author, Description
 * 09 Jan 2022, PJR, File created
 *
 *************************/
global.DEBUG = false;
const fs = require("fs");
const { initializeApp } = require('./init.js')

const myArgs = process.argv.slice(2);
if(DEBUG) 
    if(myArgs.length > 1) console.log('the myapp.args: ', myArgs);

switch (myArgs[0]) {
    case 'init':
    case 'i':
        if(DEBUG) console.log(myArgs[0], ' - initialize the app.');
        initializeApp();
        break;
    case 'config':
    case 'c':
        if(DEBUG) console.log(myArgs[0], ' - display the configuration file');
        break;
    case 'token':
    case 't':
        if(DEBUG) console.log(myArgs[0], ' - generate a user token');
        break;  
    case 'help':
    case 'h':
    default:
        fs.readFile(__dirname + "/views/usage.txt", (error, data) => {
            if(error) throw error;
            console.log(data.toString());
        });
}