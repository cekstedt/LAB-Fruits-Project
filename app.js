// Module imports.

const mongoose = require("mongoose");

// Global variables.

const url = 'mongodb://localhost:27017';
const dbName = 'fruitsDB';

// Mongoose setup.

mongoose.connect(url + "/" + dbName);

// Schema defines the form of each document.
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    // Validation code in mongoose.
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

// Model defines the collection inside the db (written singularly,
// mongoose will parse as plural?), and the schema each document will
// conform to.
const Fruit = mongoose.model("Fruit", fruitSchema);

// Document creation.
// const fruit = new Fruit({
//   name: "Apple",
//   rating: 7,
//   review: "Pretty solid as a fruit."
// });
// fruit.save(); // Comment out for repeated running.

// Person db.
// const personSchema = new mongoose.Schema({
//   name: String,
//   age: Number
// });
// const Person = mongoose.model("Person", personSchema);
// const person = new Person({
//   name: "John",
//   age: 37
// });
// person.save()

// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 10,
//   review: "The best fruit!"
// });
//
// const orange = new Fruit({
//   name: "Orange",
//   rating: 4,
//   review: "Too sour for me."
// });
//
// const banana = new Fruit({
//   name: "Banana",
//   rating: 3,
//   review: "Weird texture."
// });

// Model method.
// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all fruits to fruitsDB");
//   }
// });

// Fruit.find(function(err, fruits) {
//   if (err) {
//     console.log(err);
//   } else {
//
//     mongoose.connection.close();
//
//     fruits.forEach(function(fruit) {
//       console.log(fruit.name);
//     });
//   }
// });

// Relationships

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});
const Person = mongoose.model("Person", personSchema);

// const pineapple = new Fruit({
//   name: "Pineapple",
//   rating: 9,
//   review: "Great fruit."
// });
// pineapple.save();
//
// const person = new Person({
//   name: "Amy",
//   age: 12,
//   favoriteFruit: pineapple
// });
// person.save()

const mango = new Fruit({
    name: "Mango",
    rating: 6,
    review: "OK fruit."
});
mango.save();

Person.updateOne({name: "John"}, {favoriteFruit: mango}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Success");
  }
});
