const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { UserModelApi } = require('./models.js');
var session      = require('express-session');


const authenticateLocalUser = (username, password, done) => {
 return UserModelApi.findOne({ username, password })
    .then((user) => {
      if(user) {
        return done(null, user);
      } else {
        return done(null, {});
      }
    });
};

const authenticate = (app) => {
  
  app.use(passport.initialize());
  app.use(passport.session());


  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
    // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    UserModelApi.findOne({_id: id}).then(function(user) {
        done(null, user);
    });
  });

  passport.use('local-login', new LocalStrategy(
    {
      usernameField : 'username',
      passwordField : 'password',
    },
    authenticateLocalUser));

};


module.exports = {
  passport,
  authenticate
};
