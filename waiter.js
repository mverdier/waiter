//Using HTTP libraries
var http = require('http');
 
//Creating a web server
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end('{"response": "OK"}');
}).listen(3000);
 
console.log('Server running on port 3000.');