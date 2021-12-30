var http = require('http');
var fs = require('fs');

//serveText('Hello World');
//serveHtml('<html><body>Woot Woot</body></html>');
//serveFile('test.html');
serveJson('user.json')

function serveText(theText){
  http.createServer(function (req, res) {
    console.log('test was served.')
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(theText);
    res.end();
  }).listen(3001);
}

function serveHtml(theHtml){
  http.createServer(function (req, res) {
    console.log('html was served.')
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(theHtml);
    res.end();
  }).listen(3002);
}
function serveFile(filename) {
  http.createServer(function (req, res) {
    fs.readFile(filename, function(err, data) {
      if(err)
          console.log(err);
      else {
        console.log('file ' + filename + ' was served.')
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      }   
    });
  }).listen(3003);
}

function serveJson(jsonfile) {
  http.createServer(function (req, res) {
    fs.readFile(jsonfile, function(err, data) {
      if(err)
          console.log(err);
      else {
        console.log('json file ' + jsonfile + ' was served.')
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.write(data);
        return res.end();
      }   
    });
  }).listen(3004);
}
