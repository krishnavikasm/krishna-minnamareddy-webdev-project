import React, { Component } from 'react';
import PropTypes from 'prop-types';

  //           <ul className="nav navbar-nav">
  //             <li className="active"><a href="/">Home</a></li>
  //             <li className="dropdown">
  //               <a className="dropdown-toggle" data-toggle="dropdown" href="#">
  //                 Vi
  //                 <span className="caret" />
  //               </a>
  //               <ul className="dropdown-menu">
  //                 <li><a href="#">Page 1-1</a></li>
  //                 <li><a href="#">Page 1-2</a></li>
  //                 <li><a href="#">Page 1-3</a></li>
  //               </ul>
  //             </li>
  //             <li><a href="#">Page 2</a></li>
  //             <li><a href="#">Page 3</a></li>
// </ul>

class Header extends Component {
  componentDidMount() {
  }


  showRight = () => {
    if (this.props.isLoggedIn) {
      return (
        <ul className="nav navbar-nav navbar-right">
        <li><a href="/#/profile">
        <span className="glyphicon glyphicon-user"></span> Profile</a>
        </li>
        <li><a href="/#/logout">
        <span className="glyphicon glyphicon-log-in">
        </span> Logout</a>
        </li>
        </ul>
      );
    }
    else {
      return (
        <ul className="nav navbar-nav navbar-right">
        <li><a href="/#/signup">
        <span className="glyphicon glyphicon-user"></span> Sign Up</a>
        </li>
        <li><a href="/#/loginform">
        <span className="glyphicon glyphicon-log-in">
        </span> Login</a>
        </li>
        </ul>
      );
    }
  }

  displayVisualizations() {
    const {  user } = this.props;
    if (!user || !user.role || user.role === `consumer`) {
      return undefined;
    }
    return (<a className="navbar-brand" href="/#/addvisualization">Add visualization</a>);
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="/">{this.props.name}</a>
            {
              this.displayVisualizations()
                }
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            {this.showRight()}
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  isLoggedIn: PropTypes.bool,
};
Header.defaultProps = {
  name: 'Home',
  menuItems: [],
};

export default Header;
