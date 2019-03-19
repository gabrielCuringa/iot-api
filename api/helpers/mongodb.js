var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "iot_dekeyser_curinga";

function connection(callback) {
  MongoClient.connect(url, function(err, client) {
    var db = client.db(dbName);

    assert.equal(null, err);
    callback(err, db);
  });
}

module.exports = {
  select: (collectionName, query, callback) => {
    connection(function(err, db) {
      if (err) throw err;
      db.collection(collectionName)
        .find(query)
        .toArray(function(error, result) {
          if (error) {
            console.log("la");
            callback(error, result);
          }
          //console.log{(result);
          callback(error, result);
        });
    });
  },
  checkCollectionExistance: (collectionName, callback) => {
    connection((err, db) => {
      db.listCollections().toArray((error, columns) => {
        var exists = false;
        columns.forEach(column => {
          if (column.name == collectionName) exists = true;
        });
        callback(exists);
      });
    });
  },
  create: (collectionName, callback = () => {}) => {
    connection((err, db) => {
      dbo.createCollection(collectionName, (err, res) => {
        if (err) throw err;
        console.log("Collection created!");
        callback(res);
      });
    });
  },
  insert: (collectionName, datas, callback) => {
    connection((err, db) => {
      if (err) throw err;
      db.collection(collectionName).insertOne(datas, (error, result) => {
        callback(error, result);
      });
    });
  },
  update: (collectionName, datas, callback = () => {}) => {
    connection((err, db) => {
      if (err) throw err;
      db.collection(collectionName).updateOne(
        datas.query,
        datas.newvalues,
        (error, result) => {
          callback(error, result);
        }
      );
    });
  }
};
