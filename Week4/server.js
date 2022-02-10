const http = require('http');
var fs = require('fs');

// load the logEvents module
const logEvents = require('./logEvents');

// add a global for debugging
global.DEBUG = true;

// define/extend an EventEmitter class
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};

// initialize an new emitter object
const myEmitter = new MyEmitter();
// add the listener for the logEvent
myEmitter.on('log', (event, level, msg) => logEvents(event, level, msg));

// file based text/html
const server = http.createServer((request, response) => {
    let path = "./views/";
    switch(request.url) {
        case '/':
            myEmitter.emit('log', request.url, 'INFO', 'root of site was visited');
            path += "index.html";
            response.statusCode = 200;
            fetchFile(path);
            break;
        case '/about':
            myEmitter.emit('log', request.url, 'INFO', 'route was visited');
            path += "about.html";
            response.statusCode = 200;
            fetchFile(path);
            break;        
        case '/about-me':
            myEmitter.emit('log', request.url, 'WARNING', 'deprecated route was visited');
            response.statusCode = 301;
            response.setHeader('Location', '/about');
            response.end();
            break;
        case '/contact':
            myEmitter.emit('log', request.url, 'INFO', 'route was visited');
            path += "contact.html";
            response.statusCode = 200;
            fetchFile(path);
            break;
        case '/set-cookies':
            myEmitter.emit('log', request.url, 'INFO', 'a cookie was set');
            response.setHeader('Set-cookie', 'fullName=Fred Flinstone');
            response.end("Don't toss your cookies");
            break;
        default:
            myEmitter.emit('log', request.url, 'ERROR', 'invalid route was visited');
            path += "404.html";
            response.statusCode = 404;
            fetchFile(path);
            break;
    }

    function fetchFile(path) {
        fs.readFile(path, function(err, data) {
            if(err) {
                console.log(err);
                response.end();
            } else {
                if(DEBUG) console.log('file was served.');
                response.writeHead(response.statusCode, {'Content-Type': 'text/html'});
                response.write(data);
                response.end();
            }   
        })
    };
});

server.listen(3000, 'localhost', () => {
    console.log('listening on port 3000.')
});



