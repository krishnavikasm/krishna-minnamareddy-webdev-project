const { routes } = require('./routes.js');
const { authenticate } = require('./auth.js');


const initiate = (app) => {
  authenticate(app);
  routes(app);
};

module.exports = {
  initiate,
};
