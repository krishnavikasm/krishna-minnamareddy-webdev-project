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

    const id = this.props.visualization ? this.props.visualization._id : undefined;

    fetch(`/listcomments/${id}`, opts)
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

              <div className="card" key={`comment${index + 20}`}>
                <div className="card-header">
                  {comment.user.username} Says
                </div>
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>{comment.text}</p>
                    <footer className="blockquote-footer">Date:
                      <cite title="Source Title">{comment.date.toString()}</cite></footer>
                  </blockquote>
                </div>
              </div>
            )) }
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
