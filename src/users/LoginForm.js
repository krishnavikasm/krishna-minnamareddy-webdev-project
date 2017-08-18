import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

class LoginForm extends Component {

  componentWillMount() {
    if(this.props.user) {
      this.context.router.push('/');
    }
  }

  componentWillReceiveProps() {
    if(this.props.user) {
      this.context.router.push('/');
    }
  }

  submit = (event) => {
    event.preventDefault();
    const opts = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        username: this.form.username.value,
        password: this.form.password.value,
      }),
    };
    fetch('login', opts)
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.isAuthenticated) {
          this.user = jsonResponse.user;
          this.props.onLogin(this.user);
          this.context.router.push('/');
        }
      });
  }

  render() {
    return (
      <div>
      <form className="col-xs-4 col-xs-offset-4" onSubmit={this.submit} ref={(node) => { this.form = node; }}>
        <div className="form-group">
          <label htmlFor="username" > Username </label>
          <input className="form-control" type="text" name="username" />
        </div>
        <div className="form-group">
            <label htmlFor="password"> Password </label>
            <input type="password" name="password" className="form-control" />
        </div>
        <div className="form-group">
          <button className="form-control btn btn-primary btn-block" type="submit" >Submit</button>
        </div>
        <div className="form-group">
          <a href="/login/facebook" className="form-control btn btn-primary btn-block">Login with Facebook</a>
      </div>
      </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  onLogin: PropTypes.func,
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default LoginForm;
