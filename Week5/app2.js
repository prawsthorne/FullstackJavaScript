let http = require('http');
const url = require('url');

function handler(req, res){
    console.log(req.method);
  if(req.method == 'GET'){ 
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end("<html><body><form action='/' method='post'><input type='text' name='hello'><input type='submit'></form></body></html>");
  } else if(req.method == 'POST'){
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    console.log(req);
    //res.end(`<html>Success Posting!</html>`)
      var POST = req.body.hello;
      console.log(POST);
      let data = POST.submit;
      res.end(`<html>${data}</html>`);
  } else {
    res.writeHead(200);
    res.end();
  };
};


http.createServer(handler).listen(3000, function(err) {
  if (err) {
    console.log('Error starting https server');
  } else {
    console.log('Server listening on port 3000');
  };
});