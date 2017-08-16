import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';


class Logout extends Component {
  logout = () => {
    const opts = {
      method: 'POST',
      credentials: 'same-origin',
    };
    fetch('/logout', opts)
      .then(() => {
      });
    this.props.router.push('/');
  }
  render() {
    return (
      <button onClick={this.logout}> Logout</button>
    );
  }
}

Logout.propTypes = {
  router: PropTypes.object.isRequired, // eslint-disable-line
};


export default Logout;
