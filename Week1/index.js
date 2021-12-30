var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  fs.readFile('test.html', function(err, data) {
    if(err)
        console.log(err);
    else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
    }   
  });
}).listen(8080);