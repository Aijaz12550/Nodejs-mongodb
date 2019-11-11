const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://name:password@cluster0-ywqrk.mongodb.net/<databaseName>?retryWrites=true&w=majority"

mongoose.connect(mongoURI);

module.exports = mongoose;
