import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';


class Logout extends Component {
  componentWillMount() {
    const opts = {
      method: 'POST',
      credentials: 'same-origin',
    };
    fetch('/logout', opts)
      .then(() => {
        this.props.onLogout();
        this.props.router.push('/');
      });
  }
  render() {
    return (
     <noscript />
    );
  }
}

Logout.propTypes = {
  router: PropTypes.object.isRequired, // eslint-disable-line
  onLogout: PropTypes.func,
};


export default Logout;
