import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';

class MainNavigation extends Component {
  state = {
    collapsed: false,
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  render() {
    const { collapsed } = this.state;

    return (
      <Layout.Sider
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[]}
          defaultOpenKeys={[]}
        >
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>Option 2</span>
          </Menu.Item>
          <Menu.SubMenu
            key="sub1"
            title={<span><Icon type="user" /><span>User</span></span>}
          >
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="sub2"
            title={<span><Icon type="team" /><span>Team</span></span>}
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="8">
            <Icon type="file" />
            <span>File</span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    );
  }
}

/* eslint-disable */
MainNavigation.__ANT_LAYOUT_SIDER = true;
/* eslint-enable */

export default MainNavigation;
