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
CollectionDriver.prototype.get = function(collectionName, name, brand, country, taste, flavor, color, callback) {
	this.getCollection(collectionName, function(error, the_collection) {
		if (error) callback(error);
		else {

			var filters = {};

			if (name !== undefined && name !== "") {
				filters.name = name;
			}

			if (brand !== undefined && brand !== "") {
				filters.brand = brand;
			}

			if (country !== undefined && country !== "") {
				filters.country = country;
			}

			if (taste !== undefined && taste !== "") {
				filters.taste = taste;
			}

			if (flavor !== undefined && flavor !== "") {
				filters.flavor = flavor;
			}

			if (color !== undefined && color !== "") {
				filters.color = color;
			}

			the_collection.find({filters}, function(error, doc) {
				if (error) callback(error);
				else callback(null, doc);
			});
		}
	});
};