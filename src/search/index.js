import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import injectTapEventPlugin from 'react-tap-event-plugin';

// material-ui
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import { Table, TableBody, TableHeader, TableHeaderColumn,
         TableRow, TableRowColumn } from 'material-ui/Table';

const API_KEY = 'Wp9sPTM_TDoyaTxu4yZ-';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: [] };
    injectTapEventPlugin();
  }

  componentWillMount() {
    fetch(` https://www.quandl.com/api/v3/datasets.json?database_code=NSE&sort_by=id&page=1&api_key=${API_KEY}`)
      .then(response => response.json())
      .then((jsonResponse) => {
        this.data = jsonResponse.datasets;
        const datasets = this.data.map(dataset => dataset.name);
        this.setState({ dataSource: datasets });
      })
      .catch((error) => { this.setState({ error }); });
  }

  handleUpdate = (name) => {
    const currentData = this.data.find(dataset => dataset.name === name);
    this.setState({ currentData, selectedDataset: undefined });
  }

  fetchDataSet = (database, code) => {
    fetch(`https://www.quandl.com/api/v3/datasets/${database}/${code}.json?limit=10&api_key=${API_KEY}`)
      .then(response => response.json())
      .then((jsonResponse) => {
        const selectedDataset = jsonResponse.dataset;
        this.setState({ selectedDataset });
      })
      .catch((error) => { this.setState({ error }); });
  }

  renderSelectedDataset = () => {
    const { currentData, selectedDataset } = this.state;
    if (selectedDataset) {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              {selectedDataset.column_names.map(column =>
                <TableHeaderColumn key={column}>{column}</TableHeaderColumn>)}
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedDataset.data.map((items, index) => (<TableRow key={`items${index + 10}`}>
              {items.map(item => <TableRowColumn key={`item${item}`}>{item}</TableRowColumn>)}
            </TableRow>))}
          </TableBody>
        </Table>
      );
    }
    return (
      <div>
        <div>Name: {currentData.name}</div>
        <div>Premium: {currentData.premium.toString()}</div>
        <div>code: {currentData.database_code}</div>
        <div>frequency: {currentData.frequency}</div>
        <div>description: {currentData.description}</div>
        <div>Refreshed At:{currentData.refreshed_at.toString()}</div>
      </div>
    );
  }

  renderCurrentData = () => {
    const { currentData } = this.state;
    if (currentData) {
      return (
        <div>
          <div>{
              !this.state.selectedDataset &&
              <FlatButton
                primary
                label="Click to fetch this data"
                onClick={() => this.fetchDataSet(currentData.database_code,
                                                   currentData.dataset_code)}
              />
              }
          </div>
          {this.renderSelectedDataset()}
        </div>
      );
    }
    return <noscript />;
  }
  render() {
    return (
      <div>
        <AutoComplete
          hintText="Type dataSource name to findout the api"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdate}
        />
        {this.renderCurrentData()}
      </div>
    );
  }
}

export default Search;
