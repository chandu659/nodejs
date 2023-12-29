let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27107/user');