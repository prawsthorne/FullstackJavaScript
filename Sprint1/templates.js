const folders = ['models', 'views', 'routes', 'logs'];
const config = { 
    name: 'AppConfigCLI',
    version: '1.0.0',
    description: 'The Command Line Interface (CLI) for the MyApp.',
    main: 'myapp.js',
    superuser: 'adm1n'
};
const init = `
myapp init <command>

Usage:

myapp init all          creates the folder structure and config file
myapp init mk           creates the folder structure
myapp init cat          creates the config file with default settings`;

module.exports = {
    folders,
    config,
    init,
};