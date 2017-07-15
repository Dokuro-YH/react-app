import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Main, Login } from './layouts';

class App extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    siderCollapsed: PropTypes.bool.isRequired,
  }
  render() {
    const { isLoggedIn, siderCollapsed } = this.props;

    if (isLoggedIn) {
      return <Main siderCollapsed={siderCollapsed} />;
    }
    return <Login />;
  }
}

const mapStateToProps = ({ app }) => ({
  isLoggedIn: app.isLoggedIn,
  siderCollapsed: app.siderCollapsed,
});

export default connect(mapStateToProps)(App);
