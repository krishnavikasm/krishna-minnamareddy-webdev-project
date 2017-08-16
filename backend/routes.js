const { passport } = require('./auth.js');
const { CommentModelApi, UserModelApi } = require('./models.js');

const isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) {
    next();
  } else {
    res.send({status: 401});
  }
};

const routes = (app) => {
  app.post("/login",
           passport.authenticate('local-login'),
           (req, res) => {
             res.send({isAuthenticated: true, user: req.user });
           });

  app.get("/login",
          (req, res) => {
            res.send('you are not logged in');
          });

  app.post("/logout", isAuthenticated, (req, res) => {
    req.logout();
    res.send({ status: 200 });
  });

  app.post("/submit",
           isAuthenticated,
           (req, res) => {
             const text = req.body.text;
             CommentModelApi.createComment({ text, user: req.user._id })
               .then((response) => {
                 res.send({ status: 200});
               })
               .catch((error) => res.send({ status: 500 }));
           });

  app.get("/listcomments", isAuthenticated, (req, res) => {
    CommentModelApi.find({}).populate("user").exec((err, comments) => {
      res.send({ status: 200, comments });
    });
  });
  
  app.get("/authenticate", isAuthenticated, (req, res) => res.send({ status: 200 }));

};

module.exports = {
  routes
};
