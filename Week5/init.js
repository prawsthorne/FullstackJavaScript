const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

let init = `
myapp init <command>

Usage:

myapp init all          creates the folder structure and config file
myapp init mk           creates the folder structure
myapp init cat          creates the config file with default settings`

if(fs.existsSync(path.join(__dirname, './views'))) {
    fs.writeFile('./views/test.txt', init, (err) => {
        if(err) console.log(err);
        else console.log('Data written to test.txt file');
    });
} else {
    fsPromises.mkdir(path.join(__dirname, 'views'));
}