const logEvents = require('./logEvents');

// define/extend the class
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
// initialize an object
const myEmitter = new MyEmitter();

// add the listener for the logEvent
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
    //emit event
    myEmitter.emit('log', 'Log event emitted!');
}, 2000);


