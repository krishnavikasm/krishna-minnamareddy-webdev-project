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

  passport.use('facebook',
               new FacebookStrategy({
                 clientID: process.env.CLIENT_ID,
                 clientSecret: process.env.CLIENT_SECRET,
                 callbackURL: "http://webdev-spring-2017-krishna.herokuapp.com//login/facebook/return",
                 enableProof: true,
  },
                                    function(accessToken, refreshToken, profile, cb)
                                    {
                                      UserModelApi.findOne(
                                        {username: profile.id})
                                        .then(response => {
                                          if(!response)  {
                                            UserModelApi.createUser({
                                              username: profile.id,
                                              firstName: profile.displayName
                                            }).then(response => {
                                              return cb(null, response);
                                            });
                                          } else {
                                            return cb(null, response);
                                          }
                                        }).catch(err => console.log(err));
                                    }));

};


module.exports = {
  passport,
  authenticate
};
