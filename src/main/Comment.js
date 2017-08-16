import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

import Logout from 'main/Logout';
import ListComments from 'main/ListComments';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getMessage = () => {
    if (this.status === undefined) {
      return undefined;
    }

    if (this.state.status) {
      return (<h1>Comment Submitted Successfully</h1>);
    }

    if (!this.state.status) {
      return (<h1>Error Please try again later</h1>);
    }
    return <noscript />;
  };

  submit = (event) => {
    event.preventDefault();
    const opts = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        text: this.form.comment.value,
      }),
    };
    fetch('/submit', opts)
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.status === 401) {
          this.context.router.push('/');
        }
        if (jsonResponse.status === 200) {
          this.setState({ status: true });
        }
        if (jsonResponse.status === 500) {
          this.setState({ status: false });
        }
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit} ref={(node) => { this.form = node; }}>
          <textarea rows="3" name="comment" />
          <button type="submit">submit</button>
        </form>
        <ListComments commentsUpdated />
        <Logout router={this.context.router} />
        { this.getMessage() }
      </div>
    );
  }
}

Comment.propTypes = {
};

Comment.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default Comment;
