var { mongoose } = require("./database.js");

var User = {
  username: String,
  firstName: String,
  lastName: String,
  password: String,
  isAuthenticated: Boolean,
  email: String,
  role: String,
  token: String
};

var Consumer = mongoose.Schema(Object.create(User, {
}));


var Producer = mongoose.Schema(Object.create(User, {
}));


var Visualization = mongoose.Schema({
  data: [{ x: String, y: String}],
  name: String,
  producerId: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

var Note = mongoose.Schema({
  text: String,
  top: Number,
  left: Number,
  visualization: { type: mongoose.Schema.ObjectId, ref: 'Visualization' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
});



var Comment = {
  text: String,
  visualization: { type: mongoose.Schema.ObjectId, ref: 'Visualization' },
  parent: { type: mongoose.Schema.ObjectId, ref: 'Comment' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now() }
};


module.exports = {
  User,
  Consumer,
  Producer,
  Visualization,
  Comment,
  Note
};
