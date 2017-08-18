import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Signup extends Component {
  render() {
    return (
      <form className="form-horizontal col-xs-12">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input className="form-control" name="username" placeholder="username" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className="form-control" name="password" placeholder="password" type="password" />
        </div>
        <div className="form-group">
          <button className="form-control btn btn-block btn-primary">SignUp</button>
        </div>
      </form>
    );
  };
}
