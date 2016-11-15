//Using HTTP and Express libraries
var http = require('http'),
	express = require('express'),
	path = require('path');

var MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server,
BeerDriver = require('./beerDriver').BeerDriver;
IpDriver = require('./ipDriver').IpDriver;

var app = express();
app.set('port', process.env.PORT || 3000);

var url = 'mongodb://localhost:27017/beer';
var mongoHost = 'localhost';
var mongoPort = 27017; 
var beerDriver;
var ipDriver;

//Starting the collection driver linked to our mongo database
MongoClient.connect(url, function(err, db) {
	if (!MongoClient) {
		console.error("Error! Exiting... Must start MongoDB first");
		process.exit(1);
	}

	//Fetching the beer database and both collection drivers
	beerDriver = new BeerDriver(db);
	ipDriver = new IpDriver(db);
});

app.use(express.static(path.join(__dirname, 'public')));

//Getting a list of beers according to the required filters
app.get('/get', function (req, res) {

	var ip = req.headers['x-forwarded-for'];

	var params = req.query;
	params["__proto__"] = null;

	console.log(new Date().toJSON() + ' - [INFO] GET request on /get from IP ' + ip + ' with parameters ' + JSON.stringify(params));

	//Fetching data
	beerDriver.get("beer", params, function(error, objs) {
		if (error) { res.send(400, error); }
		else { 
			objs.toArray(function (err, beers) {
				res.send(200, beers);
			});
		}
	});

	//Incrementing IP request count
	ipDriver.increment("ip", ip, function(error) {
		if (error) {
			console.log(new Date().toJSON() + " - [ERROR] Error while incrementing request count for IP " + ip + ": " + error);
		}
	});
});

//Creating the web server
http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
