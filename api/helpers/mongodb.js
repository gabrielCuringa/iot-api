var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

var assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "iot";
// Collection to work with
const collection = "sensors";

function connection(callback) {
  MongoClient.connect(url, function(err, client) {
    var db = client.db(dbName);

    assert.equal(null, err);
    callback(err, db);
  });
}

exports.getCollection = function(callback, collectionName) {
  connection(function(err, db) {
    if (err) console.log(err);
    db.collection(collection)
      .find()
      .toArray(function(err, result) {
        if (err) throw err;
        //console.log(result);
        callback(result);
      });
  });
};
