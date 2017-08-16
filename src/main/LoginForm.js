import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

class LoginForm extends Component {

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
          this.context.router.push('/comment');
        }
      });
  }

  render() {
    return (
      <form onSubmit={this.submit} ref={(node) => { this.form = node; }}>
        <label htmlFor="username" > Username </label>
        <input type="text" name="username" />
        <label htmlFor="password"> Password </label>
        <input type="password" name="password" />
        <button type="submit" >Submit</button>
      </form>
    );
  }
}

LoginForm.propTypes = {
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default LoginForm;
