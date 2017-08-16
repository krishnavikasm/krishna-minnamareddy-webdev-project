const mongoose = require('mongoose');
const connectionString = 'mongodb://vikas:vikas@ds151242.mlab.com:51242/heroku_g0sv4lv3';

mongoose.connect(connectionString, { useMongoClient: true });
mongoose.connection;

module.exports = {
  mongoose
};
