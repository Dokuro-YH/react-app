import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { withRouter, Switch, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainLayout from '../components/MainLayout';
import LoginLayout from '../components/LoginLayout';
import * as AppActions from '../actions/app';

import Dashboard from './Dashboard';
import Users from './Users';
import Teams from './Teams';

class App extends Component {
  static defaultProps = {
    user: {},
  }
  static propTypes = {
    state: PropTypes.shape({
      treeMenu: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.any.isRequired,
        title: PropTypes.string.isRequired,
        icon: PropTypes.string,
      }).isRequired).isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }),
      collapsed: PropTypes.bool.isRequired,
      selectedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
      openedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
      isLoggedIn: PropTypes.bool.isRequired,
    }).isRequired,
    actions: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
      toggleSidenav: PropTypes.func.isRequired,
      updateSelectedKeys: PropTypes.func.isRequired,
      updateOpenedKeys: PropTypes.func.isRequired,
    }).isRequired,
  }
  render() {
    const { state, actions } = this.props;

    const mainLayoutProps = {
      treeMenu: state.treeMenu,
      user: state.user,
      collapsed: state.collapsed,
      selectedKeys: state.selectedKeys,
      openedKeys: state.openedKeys,
      logout: actions.logout,
      toggleSidenav: actions.toggleSidenav,
      updateSelectedKeys: actions.updateSelectedKeys,
      updateOpenedKeys: actions.updateOpenedKeys,
    };

    const loginLayoutProps = {
      login: actions.login,
    };

    return (
      <div id="app">
        <ReactCSSTransitionGroup
          transitionName="slide-y-transition"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {state.isLoggedIn ?
            <MainLayout key="main" {...mainLayoutProps} >
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/users" component={Users} />
                <Route path="/teams" component={Teams} />
              </Switch>
            </MainLayout> :
            <LoginLayout key="login" {...loginLayoutProps} />}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state.app,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
