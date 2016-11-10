var ObjectID = require('mongodb').ObjectID;

CollectionDriver = function(db) {
	this.db = db;
};

//Alows getting of a collection
CollectionDriver.prototype.getCollection = function(collectionName, callback) {
	this.db.collection(collectionName, function(error, the_collection) {
		if (error) callback(error);
		else callback(null, the_collection);
	});
};

//Finds objects according to a criteria in the DB
CollectionDriver.prototype.get = function(collectionName, filters, callback) {
	this.getCollection(collectionName, function(error, the_collection) {
		if (error) callback(error);
		else {
			//Finding data in the DB
			the_collection.find(filters, function(error, doc) {
				if (error) callback(error);
				else callback(null, doc);
			});
		}
	});
};

exports.CollectionDriver = CollectionDriver;