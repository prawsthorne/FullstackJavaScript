const folders = ['models', 'views', 'routes', 'logs'];

const configjson = { 
    name: 'AppConfigCLI',
    version: '1.0.0',
    description: 'The Command Line Interface (CLI) for the MyApp.',
    main: 'myapp.js',
    superuser: 'adm1n',
    database: 'exampledb'
};

const usagetxt = `

myapp <command> <option>

Usage:

myapp init --all                creates the folder structure and config file
myapp init --mk                 creates the folder structure
myapp init --cat                creates the config file with default settings
myapp config --show             displays a list of the current config settings
myapp config --reset            resets the config file with default settings
myapp config --set              sets a specific config setting
myapp token --count             displays a count of the token created
myapp token --new <username>    generates a token for a given username, saves tokens to the json file
myapp token --fetch <username>  fetches a token for a given username
`;

const inittxt = `

myapp init <command> <option>

Usage:

myapp init --all          creates the folder structure and config file
myapp init --mk           creates the folder structure
myapp init --cat          creates the config file with default settings
`;

const configtxt = `

myapp <command> <option>

Usage:

myapp config --show     displays a list of the current config settings
myapp config --reset    resets the config file with default settings
myapp config --set      sets a specific config setting
`;

const tokentxt = `

myapp <command> <option>

Usage:

myapp token --count             displays a count of the token created
myapp token --new <username>    generates a token for a given username, saves tokens to the json file
myapp token --fetch <username>  fetches a token for a given username
`;

module.exports = {
    folders,
    configjson,
    usagetxt,
    inittxt,
    configtxt,
    tokentxt,
};