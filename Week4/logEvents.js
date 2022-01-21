// NPM installed Modules
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

// Node.js common core global modules
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (event, message) => {
    const dateTime = `${format(new Date(), 'yyyy-MMM-dd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${event}\t${message}\n`;
    console.log(logItem);
    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem);
    } catch (err) {
        console.log(err);
    }
}

module.exports = logEvents;