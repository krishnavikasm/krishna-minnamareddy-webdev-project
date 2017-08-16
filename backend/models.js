const { mongoose } = require('./database.js');
const { User, Comment } = require('./schema.js');

const UserModel = mongoose.model('User', User);
const CommentModel = mongoose.model('Comment', Comment);

UserModelApi = {
  createUser: (user) => UserModel.create(user),
  findOne: (user) => UserModel.findOne(user),
  findUserById: (_id) => UserModel.findOne({ _id }),
  findUserByUserName: (userName) => UserModel.findOne({ userName }),
  findUserByCredentials: (userName, password) => UserModel.findOne({ userName, password }),
  updateUser: (_id, user) => UserModel.findOneAndUpdate({ _id }, user),
};


CommentModelApi = {
  createComment: (comment) => CommentModel.create(comment),
  find: (comment) => CommentModel.find(comment)
};

module.exports = {
  UserModelApi,
  CommentModelApi
};
