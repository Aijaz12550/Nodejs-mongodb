const mongoose = require('mongoose');

const mongoURI = "uri"

mongoose.connect(mongoURI);

module.exports = mongoose;
