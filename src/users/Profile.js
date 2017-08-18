import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchPut } from 'utils/fetch';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }
  
  onSubmit = (event) => {
    event.preventDefault();
    const user = {
      firstName: this.form.username.value,
      lastName: this.form.lastname.value,
      email: this.form.email.value,
    };

    const updatedUser = Object.assign({}, this.props.user, user);
    console.log(updatedUser);
    fetchPut('updateuser', updatedUser);
  }
  
  render() {
    const { user } = this.props;
    if (this.props.user) {
      let { firstName, lastName, email } = this.props.user;
      return (
        <form onSubmit={this.onSubmit} className="form-horizontal col-xs-12" ref={node => ( this.form = node )}>
          <div className="form-group">
            <label htmlFor="username">Firstname</label>
            <input className="form-control" defaultValue={firstName} name="username" placeholder="firstname" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">lastname</label>
            <input className="form-control" defaultValue={lastName} name="lastname" placeholder="lastname" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input className="form-control" defaultValue={email} name="email" placeholder="email" type="email" />
          </div>
          <div className="form-group">
            <button className="form-control btn btn-block btn-primary">Submit</button>
          </div>
        </form>
      );
    }
    return <noscritp />;
  };
}

Profile.propTypes = {
  user: PropTypes.object,
}

