import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchGetApi, fetchPost } from 'utils/fetch';

import LineChart from 'visualizations/LineChart';

const API_KEY = 'Wp9sPTM_TDoyaTxu4yZ-';

const api = 'https://www.quandl.com/api/v3/datasets.json?database_code=NSE&sort_by=id&page=1&api_key=Wp9sPTM_TDoyaTxu4yZ-';

export default class AddVisualization extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  onSubmit = (event) => {
    event.preventDefault();
    const url = this.form.url.value;
    fetchGetApi(url).then(response => {
      if (response.datasets) {
        this.setState({ datasets: true, d: response.datasets });
        this.datasets = response.datasets;

      } else {
        this.setState({ datasets: false, datasetsError: true });
      }
    });
  }

  selectDataSet = (id) => {
    const dataset = this.state.d.find(dataS => dataS.id == id);
    if (!dataset) {
      this.setState({ datasetsError: true });
    }
    this.currentDataset = dataset;
    this.setState({ datasets: false, chartSelection: true, chartData: dataset });
    console.log(dataset);
    const database = dataset.database_code;
    const code = dataset.dataset_code;
    this.visualizationName = `${database}-${code}`;
    fetchGetApi(`https://www.quandl.com/api/v3/datasets/${database}/${code}.json?limit=10&api_key=${API_KEY}`)
      .then(jsonResponse => {
        console.log(jsonResponse);
        this.dataForChart =
          jsonResponse.dataset.data;
      });
  }
  
  datasetSelection = () => {
    if (this.state.datasets) {
      const datasets = this.state.d;
      return (
        <div>
          <div>Please select from these datasets</div>
          {datasets.map(dataset =>
                        <button key={dataset.id} className="list-group-item"
                                  onClick={() => this.selectDataSet(dataset.id)}>
                            {dataset.name}
                        </button>)}
        </div>
      );
    }
  }

  chartSelection = () => {
    if (this.state.chartSelection) {
      return (
        <div>
        <div className="dropdown pull-left">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
            {this.state.xAxis ? this.state.xAxis : 'Select X-axis'}
    <span className="caret"></span></button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {
              this.state.chartData.column_names.map((name,index) =>
                                                    <li  key={name}><a className="dropdown-item" onClick={() => this.setColoumnName(name, index, 'x')}>{name}</a></li>
                                                    )
            }
        </ul>
          </div>


        
          <div className="dropdown pull-right">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
          {this.state.yAxis ? this.state.yAxis : 'Select Y-axis'}
          <span className="caret"></span></button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {
            this.state.chartData.column_names.map((name, index) =>
                                                  <li  key={name}><a className="dropdown-item" onClick={() => this.setColoumnName(name, index, 'y')}>{name}</a></li>
                                                   )
          }
        </ul>
          </div>
          </div>
          
      );
    } else {
      return <noscript />;
    }
  }

  setColoumnName = (name, index, axis) => {
    if(axis == 'x') {
      this.setState({ xAxis: name, xAxisI:index });
    } else if(axis == 'y') {
      this.setState({ yAxis: name, yAxisI: index });
    }
  }

  displayLineChart = () => {
    if (this.state.xAxis && this.state.yAxis && this.dataForChart) {
      const data = this.dataForChart.map(item => ({
        x: item[this.state.xAxisI],
        y: item[this.state.yAxisI] }));
      this.visualizationData = data;
      return (
        <div>
          <br />
          <div className="form-group">
            <button onClick={this.saveVisualization} className="form-control btn btn-success btn-block">Save</button>
          </div>
          <LineChart data={data} />
        </div>
      );
    }
  };

  saveVisualization = (event) => {
    const visualization = {
      name: this.visualizationName,
      data: this.visualizationData,
      producerId: this.props.user._id,
    };

    fetchPost('addVisualization', visualization).then(response => {
      this.props.router.push("/");
    });
  }
  
  render () {
    return (
      <div>
        <form ref={form => {this.form = form;}} onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="url">Enter Your Qunadl Dataset URL</label>
            <input defaultValue={api} type="url" name="url" className="form-control"/>
          </div>
          <div className="form-group">
            <button className="form-control btn btn-primary btn-block">Submit</button>
          </div>
        </form>
        {this.datasetSelection()}
        {this.chartSelection()}
        <div>
          {this.displayLineChart()}
        </div>
      </div>
    );
  }
}
