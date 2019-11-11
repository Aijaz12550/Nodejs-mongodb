const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://aijaz:aijaz@cluster0-ywqrk.mongodb.net/campusRS?retryWrites=true&w=majority"

mongoose.connect(mongoURI);

module.exports = mongoose;