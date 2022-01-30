const fs = require('fs');
// define/extend an EventEmitter class
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
// initialize an new emitter object
const myEmitter = new MyEmitter();

myEmitter.on('route', (route, level, msg) => { 
    const d = new Date();
    if(level === 'error')
        console.log(d.toLocaleString() + ' * ' + level.toUpperCase() + ' * the ' + route + ' ' + msg)
    else
        console.log(d.toLocaleString() + ' * ' + level.toUpperCase() + ' * ' + route + '.html, ' + msg)
});

function indexPage(path, response) {
    myEmitter.emit('route', 'index', 'info', 'the home or root page for the site was visited.' )
    displayFile(path, response);
}

function aboutPage(path, response) {
    myEmitter.emit('route', 'about', 'info', 'the about page was visited.' )
    displayFile(path, response);
}

function contactPage(path, response) {
    myEmitter.emit('route', 'contact', 'info', 'the contact page was visited.' )
    displayFile(path, response);
}

function subscribePage(path, response) {
    myEmitter.emit('route', 'subscribe', 'info', 'the subscribe page was visited.' )
    displayFile(path, response);
}

function fourOfourPage(url, path, response) {
    myEmitter.emit('route', url, 'error', 'route was not found' )
    displayFile(path, response);
}
function displayFile(path, response) {
    fs.readFile(path, function(err, data) {
        if(err) {
            console.log(err);
            response.end();
        } else {
            //console.log('file was served.')
            response.writeHead(response.statusCode, {'Content-Type': 'text/html'});
            // response.write(data);
            response.end(data);
        };   
    });
};

module.exports = {
    indexPage,
    aboutPage,
    contactPage,
    subscribePage,
    fourOfourPage,
}