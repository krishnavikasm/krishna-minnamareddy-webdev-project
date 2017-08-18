import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchGet, fetchDelete } from 'utils/fetch';

export default class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    fetchGet('/getvisualizations').then(response => this.setState({ visualizations: response}));
  }

  onSelect = (id) => {
    this.props.router.push(`/linechart/${id}`);
  }

  delete = (id) => {
    fetchDelete(`/visualization/${id}`).then(response => {
      window.location.reload();
    });
  }

  showDeleteButton = (id) => {
    if (!this.props.user || !this.props.user.role) {
      return undefined;
    }
    if (this.props.user.role == 'admin') {
      return (<button onClick={() => this.delete(id)} key={`d${id}`} className="btn btn-danger">Delete</button>);
    }
  }
  
  render() {
    if (this.state.visualizations) {
      return (
      <div>
        {
          this.state.visualizations.map(
            v =>
              (<div key={v._id}>
               <button  onClick={() => this.onSelect(v._id)} className="list-group-item">{v.name}</button>
                 {this.showDeleteButton(v._id)}
               </div>
              )
          )
        }
        </div>);
    }
    return <noscript />;
  }
}
