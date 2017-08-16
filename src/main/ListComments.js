import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';

class ListComments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.fetchComments();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.commentsUpdated) {
      this.fetchComments();
    }
  }

  fetchComments = () => {
    const opts = {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    };

    fetch('/listcomments', opts)
      .then(response => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.status === 200) {
          this.comments = jsonResponse.comments;
          this.setState({ status: true });
        } else {
          this.setState({ status: false });
        }
      });
  }

  render() {
    if (this.state.status) {
      return (
        <div> {
            this.comments.map((comment, index) => (
              <div key={`comment${index + 20}`}>
                <span>By<b>{comment.user.username}</b></span>
                <p>{comment.text}</p>
                <span>Date: <i>{comment.date}</i></span>
              </div>)) }
        </div>
      );
    }
    return <noscript />;
  }
}

ListComments.propTypes = {
  commentsUpdated: PropTypes.bool,
};

ListComments.defaultProps = {
  commentsUpdated: false,
};
export default ListComments;
