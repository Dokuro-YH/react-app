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

const pickSiderProps = pick([
  'user',
  'collapsed',
  'openedKeys',
  'treeMenus',
  'currentMenu',
  'updateOpenedKeys',
]);

const pickHeaderProps = pick([
  'user',
  'collapsed',
  'logout',
  'toggleSidenav',
]);

const pickBreadProps = pick([
  'menus',
  'currentMenu',
]);

const loadRoute = name => () => import(`../routes/${name}`);

class MainLayout extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }

  render() {
    const { loading, isLoggedIn } = this.props;

    if (loading) {
      return <div>加载中</div>;
    }

    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }

    const siderProps = pickSiderProps(this.props);
    const headerProps = pickHeaderProps(this.props);
    const breadProps = pickBreadProps(this.props);

    return (
      <div className="main-layout">
        <MainSider {...siderProps} />
        <div className="main-container">
          <MainHeader {...headerProps} />
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
