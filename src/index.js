import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, Redirect } from 'react-router';

// src
import App from 'main/App';
import Signup from 'users/Signup';
import Profile from 'users/Profile';

import LineChart from 'visualizations/LineChart';
import LoadChart from 'visualizations/LoadChart';
import AddVisualization from 'visualizations/AddVisualization';
import Show from 'visualizations/Show';

import Note from 'notes/Note';

import LoginForm from 'users/LoginForm';
import Logout from 'users/Logout';

const Paths = (
  <Router history={hashHistory}>
    <Route path="/App" component={App}>
      <Route path="/signup" component={Signup}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/linechart" component={LineChart} />
      <Route path="/linechart/:id" component={LoadChart}/>
      <Route path="/note" component={Note} />
      <Route path="/loginform" component={LoginForm}/>
      <Route path="/addvisualization" component={AddVisualization}/>
      <Route path="/logout" component={Logout} />
      <Route path="/" component={Show} />
    </Route>
    <Redirect from="/_=_" to="/" />
  </Router>
);


ReactDOM.render(Paths,
                document.getElementById('main'));

