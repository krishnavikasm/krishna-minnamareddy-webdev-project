import React, { Component } from 'react';
import PropTypes from 'prop-types';

const style = {
  note: {
    position: 'absolute',
  }
};

export default class ShowNote extends Component {
  render () {
    const { top, left } = this.props;
    return (
      <div
        className="btn btn-secondary glyphicon glyphicon-info-sign"
        style={Object.assign({}, style.note, {top, left} )}
        data-toggle="tooltip" data-placement="top" 
        title={this.props.text}
      />
    );
  }
}

ShowNote.propTypes = {
  text: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
};
