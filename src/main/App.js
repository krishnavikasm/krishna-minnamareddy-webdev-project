import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchGet } from 'utils/fetch';


import Header from 'utils/Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getUser();
  }

  componentWillMount() {
    this.getUser();
  }

  getUser = () => {
    fetchGet('user').then(response => {
      if (response.user) {
        this.onLogin(response.user);
      }
    });
  }

  onLogin = (user) => {
    this.setState({user, isLoggedIn: true });
  }
  
  onLogout = () => {
    this.setState({user: undefined, isLoggedIn: false });
  }

  updateParentState = (state) => {
    this.setState(state);
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
                                                 (child) => React.cloneElement(child, {
                                                   isLoggedIn: this.state.isLoggedIn,
                                                   onLogin: this.onLogin,
                                                   onLogout: this.onLogout,
                                                   updateParentState: this.updateParentState,
                                                   parentState: this.state,
                                                   user: this.state.user,
                                                 })
    );
    return (
      <div>
        <Header
          isLoggedIn= {this.state.isLoggedIn}
          onLogin={this.onLogin}
          onLogout={this.onLogout}
          updateParentState={this.updateParentState}
          parentState={this.state}
          user={this.state.user}
        />
        <div className="col-xs-6 col-xs-offset-3">
          { childrenWithProps }
        </div>
      </div>
    );
  }
}

App.childContextTypes = {
  isLoggedIn: PropTypes.bool,
};

export default App;
