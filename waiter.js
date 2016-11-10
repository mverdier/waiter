//Using HTTP and Express libraries
var http = require('http'),
	express = require('express'),
	path = require('path');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/get', function (req, res) {
	res.send('{"name": ' + req.query.name + ', "brand": ' + req.query.brand + ', "country": ' + req.query.country + ', "taste": ' + req.query.taste + ', }');
});

//Creating a web server
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});