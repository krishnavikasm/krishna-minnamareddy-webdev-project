const { passport } = require('./auth.js');
const { CommentModelApi, UserModelApi, VisualizationModelApi, NoteApi } = require('./models.js');

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

app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/login/facebook/return', 
        passport.authenticate('facebook', { failureRedirect: '/', successRedirect: '/' }),
  function(req, res) {
    res.redirect('');
  });

  app.get("/user",
          isAuthenticated,
          (req, res) => res.send({user: req.user})
         );

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
             CommentModelApi.createComment(req.body)
               .then((response) => {
                 res.send({ status: 200});
               })
               .catch((error) => res.send({ status: 500 }));
           });

  app.get("/listcomments/:id", isAuthenticated, (req, res) => {
    CommentModelApi.find({visualization: req.params.id}).populate("user").exec((err, comments) => {
      res.send({ status: 200, comments });
    });
  });


  app.put("/updateuser", isAuthenticated , (req, res) => {
    const user = req.user;
    const updatedUser = req.body;
    console.log(updatedUser);
    UserModelApi.updateUser(user._id, updatedUser).exec((err, uUser) => {
      res.send({ status: 200, user: uUser});
    });
  });

  app.post("/addvisualization", isAuthenticated, (req, res) => {
    console.log(VisualizationModelApi);
    const visualization = req.body;
    VisualizationModelApi.create(visualization).then((response) => {
        res.send({ status: 200, visualization: response});
      }
                                                    ).catch(err => res.send({status: 200, error:err}));
  });

  app.get("/visualization/:id", (req, res) => {
    const id = req.params.id;
    VisualizationModelApi.findOne({_id: id}).then(response => res.send({
      status: 200, visualization: response
    })).catch(err => res.send({status: 200, error: err}));
  });

  app.delete("/visualization/:id", isAuthenticated, (req, res) => {
    if(req.user.role != 'admin') {
      res.sendStatus(401);
    } else {
      VisualizationModelApi.delete(req.params.id).then(response => res.send({status: 200}));
    }
  });
  
  app.get("/authenticate", isAuthenticated, (req, res) => res.send({ status: 200 }));

  app.post("/addnotes", isAuthenticated, (req, res) => {
    const notes = req.body;
    notes.forEach(note => NoteApi.create(note));
    res.send({ status: 200 });
  });

  app.get("/getnotes/:id/", isAuthenticated, (req, res) => {
    const id = req.params.id;
    const userId = req.user._id;
    NoteApi.find({visualization: id, user: userId}).then(response => res.send({ status: 200, notes: response }));
  });

  app.get("/getvisualizations", (req, res) => {
    VisualizationModelApi.find({}).then(response => res.send(response));
  });

};

module.exports = {
  routes
};
