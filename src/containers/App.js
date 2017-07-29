import React, { Component } from 'react';
import Animate from 'rc-animate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import LoginLayout from '../components/LoginLayout';
import { appActions } from '../actions/app';

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }

  renderMain = () => (
    <MainLayout key="main" {...this.props} >
      {this.props.children}
    </MainLayout>
  )

  renderLogin = () => (
    <LoginLayout key="login" {...this.props} />
  )

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div id="app">
        <Animate
          component=""
          transitionName="fade"
        >
          {isLoggedIn ? this.renderMain() : this.renderLogin()}
        </Animate>
      </div>
    );
  }
}

const mapStateToProps = state => state.app;

const mapDispatchToProps = dispatch => (bindActionCreators(appActions, dispatch));

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
