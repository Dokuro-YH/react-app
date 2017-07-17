import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainLayout from '../components/main-layout';
import LoginLayout from '../components/login-layout';

class App extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  }
  render() {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return <MainLayout />;
    }
    return <LoginLayout />;
  }
}

const mapStateToProps = ({ app }) => ({
  isLoggedIn: app.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(App));
