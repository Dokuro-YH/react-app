import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../../logo.svg';

export default class App extends Component {
  static propTypes = {
    app: PropTypes.shape({
      msg: PropTypes.string.isRequired,
    }).isRequired,
  }
  render() {
    const { app } = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{app.msg}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
