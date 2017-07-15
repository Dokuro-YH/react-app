import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { MainToolbar, MainNavigation, MainBreadcrumb } from '../../components';

export default class MainLayout extends Component {
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <MainNavigation />
        <Layout>
          <MainToolbar />
          <Layout.Content style={{ margin: '0 16px' }}>
            <MainBreadcrumb style={{ margin: '12px 0' }} />
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }} />
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
