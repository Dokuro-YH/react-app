import React, { Component } from 'react';
import { Breadcrumb } from 'antd';

class MainBreadcrumb extends Component {
  render() {
    return (
      <Breadcrumb {...this.props}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

export default MainBreadcrumb;
