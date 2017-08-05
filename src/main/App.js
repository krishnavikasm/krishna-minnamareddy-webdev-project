import React, { Component } from 'react';
import Search from 'search';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends Component {
  onChange = () => {}
  render() {
    return (
      <div>
        <h1>POC(PROJECT3)</h1>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Search onChange={this.onChange} />
        </MuiThemeProvider>
        <h1>---END OF POC---</h1>
      </div>
    );
  }
}

export default App;
