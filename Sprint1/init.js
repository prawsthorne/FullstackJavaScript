const fs = require("fs");

const myArgs = process.argv.slice(2);
if(myArgs.length > 1) console.log('the init.args: ', myArgs);

function listFolders() {
    console.log('listFolders()');

}

function listFiles() {
    console.log('listFiles()');

}

function createFolders() {
    console.log('createFolders()');

}

function createFiles() {
    console.log('createFiles()');

}

function initializeApp() {
    console.log('initializeApp()');
    
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
    }
}

module.exports = {
    listFolders,
    listFiles,
    createFolders,
    createFiles,
    initializeApp,
  }