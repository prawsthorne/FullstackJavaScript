const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

let init = `

myapp init <command>

Usage:

myapp init --all          creates the folder structure and config file
myapp init --mk           creates the folder structure
myapp init --cat          creates the config file with default settings`;

if(fs.existsSync(path.join(__dirname, './views'))) {
    fs.writeFile('./views/init.txt', init, (err) => {
        if(err) console.log(err);
        else console.log('Data written to init.txt file');
    });
} else {
    fsPromises.mkdir(path.join(__dirname, 'views'));
}

const config = { 
    name: 'AppConfigCLI',
    version: '1.0.0',
    description: 'The Command Line Interface (CLI) for the MyApp.',
    main: 'myapp.js',
    superuser: 'adm1n'
};

try {
    let data = JSON.stringify(config, null, 2);
    if(!fs.existsSync(path.join(__dirname, 'config.json'))) {
        fs.writeFile('config.json', data, (err) => {
            console.log('Data written to config.json file');
        });
    } else {
        console.log('config.json file already exists');
    }
} catch(err) {
    console.log(err);
}
