//Using HTTP and Express libraries
var http = require('http'),
	express = require('express'),
	path = require('path');

MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server,
CollectionDriver = require('./collectionDriver').CollectionDriver;

var app = express();
app.set('port', process.env.PORT || 3000);

var mongoHost = 'localhost';
var mongoPort = 27017; 
var collectionDriver;
 
//Starting the collection driver linked to our mongo database
var mongoClient = new MongoClient(new Server(mongoHost, mongoPort));
mongoClient.open(function(err, mongoClient) {
	if (!mongoClient) {
		console.error("Error! Exiting... Must start MongoDB first");
		process.exit(1);
	}

	var db = mongoClient.db("beer");

	collectionDriver = new CollectionDriver(db);
});

app.use(express.static(path.join(__dirname, 'public')));

//Getting a list of beers according to the required filters
app.get('/get', function (req, res) {

	console.log('GET request on /get from IP ' + req.headers['x-forwarded-for'] + ' with parameters ' + JSON.stringify(req.query));

	//Fetching data
	collectionDriver.get("beer", req.query, function(error, objs) {
		if (error) { res.send(400, error); }
		else { 
			objs.toArray(function (err, beers) {
				res.send(200, beers);
			});
		}
	});
});

//Creating the web server
http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
