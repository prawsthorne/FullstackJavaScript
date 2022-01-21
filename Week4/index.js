// load the logEvents module
const logEvents = require('./logEvents');

// define/extend an EventEmitter class
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};

// initialize an new emitter object
const myEmitter = new MyEmitter();
// add the listener for the logEvent
myEmitter.on('log', (event, msg) => logEvents(event, msg));

setTimeout(() => {
    //emit event
    myEmitter.emit('log', 'index.js', 'Log event emitted!');
}, 2000);


