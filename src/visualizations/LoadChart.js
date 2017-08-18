import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LineChart from 'visualizations/LineChart';

import { fetchGet } from 'utils/fetch';

export default class LoadChart extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }
  componentWillMount() {
    fetchGet(`/visualization/${this.props.params.id}`)
      .then(response => {
        if (response.status == 200) {
          this.data = response.visualization.data;
          this.visualization = response.visualization;
          this.setState({chart: true});
        }
      })
  }

  render() {
    if(this.state.chart) {
      return (<LineChart {...this.props} data={this.data} visualization={this.visualization} />);
    }
    return <noscript />;
  }
}
