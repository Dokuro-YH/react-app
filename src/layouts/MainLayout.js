import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { pick } from 'ramda';

import ScrollToTop from '../components/ScrollToTop';
import ContentLoading from '../components/ContentLoading';
import AsyncRoute from '../components/AsyncRoute';
import MainHeader from '../components/MainHeader';
import MainBreadcrumb from '../components/MainBreadcrumb';
import MainSider from '../components/MainSider';

import { appActions } from '../actions/app';

const pickHeaderProps = pick([
  'collapsed',
  'user',
  'logout',
  'toggleSidenav',
]);

const pickSiderProps = pick([
  'collapsed',
  'openedKeys',
  'treeMenus',
  'currentMenu',
  'updateOpenedKeys',
]);

const pickBreadProps = pick([
  'menus',
  'currentMenu',
]);

const loadRoute = name => () => import(`../routes/${name}`);

class MainLayout extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  }

  render() {
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }

    const headerProps = pickHeaderProps(this.props);
    const siderProps = pickSiderProps(this.props);
    const breadProps = pickBreadProps(this.props);

    return (
      <div className="main-layout">
        <MainHeader {...headerProps} />
        <div className="main-container">
          <MainSider {...siderProps} />
          <ScrollToTop>
            <div className="main-content">
              <MainBreadcrumb {...breadProps} />
              <AsyncRoute exact path="/" loading={ContentLoading} load={loadRoute('Dashboard')} />
              <AsyncRoute path="/users" loading={ContentLoading} load={loadRoute('Users')} />
              <AsyncRoute path="/teams" loading={ContentLoading} load={loadRoute('Teams')} />
            </div>
          </ScrollToTop>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.app;

const mapDispatchToProps = dispatch => bindActionCreators(appActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
