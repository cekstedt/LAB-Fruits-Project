// Adapted from https://mongodb.github.io/node-mongodb-native/3.7/quick-start/quick-start/

// Module imports.

const { MongoClient } = require('mongodb');
const assert = require("assert");

// MongoDB setup.

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'fruitsDB';
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  findDocuments(db, function() {
    client.close();
  });
});

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
    {
      name: "Apple",
      score: 8,
      review: "Great fruit"
    },
    {
      name: "Orange",
      score: 6,
      review: "Kinda sour"
    },
    {
      name: "Banana",
      score: 9,
      review: "Great stuff!"
    }
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.insertedCount);
    assert.equal(3, Object.keys(result.insertedIds).length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
}
