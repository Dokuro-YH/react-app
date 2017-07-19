import React, { Component } from 'react';
import Animate from 'rc-animate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import LoginLayout from '../components/LoginLayout';
import { appActions } from '../redux/modules/app';

class App extends Component {
  static defaultProps = {
    user: {},
    children: null,
  }
  static propTypes = {
    children: PropTypes.element,
    state: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  renderMain = () => {
    const { state, actions } = this.props;

    const mainLayoutProps = {
      menus: state.menus,
      currentMenu: state.currentMenu,
      treeMenus: state.treeMenus,
      user: state.user,
      collapsed: state.collapsed,
      openedKeys: state.openedKeys,
      logout: actions.logout,
      toggleSidenav: actions.toggleSidenav,
      updateOpenedKeys: actions.updateOpenedKeys,
    };

    return (
      <MainLayout key="main" {...mainLayoutProps} >
        {this.props.children}
      </MainLayout>
    );
  }

  renderLogin = () => {
    const { state, actions } = this.props;

    const loginLayoutProps = {
      isLoginPending: state.isLoginPending,
      login: actions.login,
    };

    return (
      <LoginLayout key="login" {...loginLayoutProps} />
    );
  }

  render() {
    const { state } = this.props;

    return (
      <div id="app">
        <Animate
          component=""
          transitionName="fade"
        >
          {state.isLoggedIn ? this.renderMain() : this.renderLogin()}
        </Animate>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state.app,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(appActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
