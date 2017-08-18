import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Note extends Component {
  onSubmit = (event) => {
    event.preventDefault();
    if(this.props.onSubmit) {
      this.props.onSubmit(this.form.text.value);
    }
  }
  onCancel = (event) => {
    event.preventDefault();
    if(this.props.onCancel) {
      this.props.onCancel();
    }
  }
  render () {
    return (
      <form ref={form => { this.form = form; }} onSubmit={this.onSubmit}>
        <div className="form-group">
          <textarea name="text" className="form-control" rows={3} placeholder="Please add a note" />
        </div>
        <div className="form-group">
          <button onClick={this.onCancel} className="form-control btn btn-danger">Cancel</button>
        </div>
        <div className="form-group">
          <button className="form-control btn btn-primary">Submit</button>
        </div>
      </form>
    );
  }
}

Note.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};
