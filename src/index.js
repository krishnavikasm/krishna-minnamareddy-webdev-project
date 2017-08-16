import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

// src
import App from 'main/App';
import LoginForm from 'main/LoginForm';
import Comment from 'main/Comment';


const Paths = (
  <Router history={hashHistory}>
    <Route path="/" component={LoginForm} />
    <Route path="/comment" component={Comment} />
    <Route path="/search" component={App} />
  </Router>
);


ReactDOM.render(Paths,
                document.getElementById('main'));

