import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';

import ListComments from 'comments/ListComments';

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
        visualization: this.props.visualization? this.props.visualization._id : undefined,
        user: this.props.user ? this.props.user._id: undefined,
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
          <div className="form-group">
            <textarea className="form-control" rows="3" name="comment" />
          </div>
          <div className="form-group">
            <button type="submit" className="form-control btn btn-primary btn-block">submit</button>
          </div>
        </form>
        <ListComments {...this.props} commentsUpdated />
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
