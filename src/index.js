import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

// src
import App from 'main/App';

const Paths = (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
  </Router>
);

ReactDOM.render(Paths,
                document.getElementById('main'));
