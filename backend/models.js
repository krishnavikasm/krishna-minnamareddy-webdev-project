const { mongoose } = require('./database.js');
const { User, Comment, Visualization, Note } = require('./schema.js');

const UserModel = mongoose.model('User', User);
const CommentModel = mongoose.model('Comment', Comment);
const VisualizationModel = mongoose.model('Visualization', Visualization);
const NoteModel = mongoose.model('Note', Note);

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

VisualizationModelApi = {
  create: (visualization) => VisualizationModel.create(visualization),
  find: (v) => VisualizationModel.find(v),
  findOne: (visualization) => VisualizationModel.findOne(visualization),
  updateVisualization: (_id, visualization) => VisualizationModel.findOneAndUpdate({_id}, visualization),
  delete: (v) => VisualizationModel.remove({_id: v}),
};

NoteApi = {
  create: (note) => NoteModel.create(note),
  find: (note) => NoteModel.find(note),
};


module.exports = {
  UserModelApi,
  CommentModelApi,
  VisualizationModelApi,
  NoteApi,
};
