/*************************
 * File Name: myapp.js
 * Purpose: The main routines to start the initialization app
 * 
 * Commands:
myapp init              creates the folder structure, creates config files
myapp config            displays the list of different config .json files
myapp config <file>     displays a specific config files contents
myapp token             displays a count and list of tokens
myapp token <username>  generates a token for a given username, saves tokens to json file
 *
 * Created Date: 09 Jan 2022
 * Authors:
 * PJR - Peter Rawsthorne
 * Revisions:
 * Date, Author, Description
 * 09 Jan 2022, PJR, File created
 *
 *************************/
const fs = require("fs");
const init = require('./init.js')

const myArgs = process.argv.slice(2);
if(myArgs.length > 1) console.log('the myapp.args: ', myArgs);

switch (myArgs[0]) {
    case 'init':
    case 'i':
        console.log(myArgs[0], ' - initialize the app.');
        init.initializeApp();
        break;
    case 'config':
    case 'c':
        console.log(myArgs[0], ' - display the configuration file');
        break;
    case 'token':
    case 't':
        console.log(myArgs[0], ' - generate a user token');
        break;  
    case 'help':
    case 'h':
    default:
        fs.readFile(__dirname + "/usage.txt", (error, data) => {
            if(error) throw error;
            console.log(data.toString());
        });
}