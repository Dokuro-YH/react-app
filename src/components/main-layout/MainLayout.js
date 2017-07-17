import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Icon } from 'antd';
import './style';

export default class MainLayout extends Component {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    collapsed: PropTypes.bool.isRequired,
    selectedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    openedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    logout: PropTypes.func.isRequired,
    toggleSidenav: PropTypes.func.isRequired,
    updateSelectedKeys: PropTypes.func.isRequired,
    updateOpenedKeys: PropTypes.func.isRequired,
  }

  handlerSelect = ({ selectedKeys }) => this.props.updateSelectedKeys(selectedKeys)

  handerMenuClick = ({ key }) => {
    if (key === 'logout') {
      this.props.logout();
    }
  }

  renderSideMenu = () => (
    <Menu
      className="main-menu"
      theme="dark"
      mode="inline"
      defaultSelectedKeys={this.props.selectedKeys}
      defaultOpenKeys={this.props.openedKeys}
      onSelect={this.handlerSelect}
      onOpenChange={this.props.updateOpenedKeys}
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
  );

  renderHanderMenu = () => (
    <Menu onClick={this.handerMenuClick}>
      <Menu.Item key="profile">我的</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  )

  renderBreadcrumb = () => (
    <Breadcrumb className="main-breadcrumb">
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      <Breadcrumb.Item>App</Breadcrumb.Item>
    </Breadcrumb>
  )

  render() {
    const user = this.props.user;
    const sideMenu = this.renderSideMenu();
    const headerMenu = this.renderHanderMenu();
    const breadcrumb = this.renderBreadcrumb();

    return (
      <Layout className="main-layout">
        <Layout.Sider
          className="main-sider"
          collapsible
          collapsed={this.props.collapsed}
          onCollapse={this.props.toggleSidenav}
        >
          <div className="logo" />
          {sideMenu}
        </Layout.Sider>
        <Layout>
          <Layout.Header className="main-header">
            <span className="fill" />
            <Dropdown overlay={headerMenu}>
              <Avatar className="main-header-avatar" src={user.avatar}>{user.username}</Avatar>
            </Dropdown>
          </Layout.Header>
          <Layout.Content className="main-content">
            {breadcrumb}
            <div className="main-content-wrapper" />
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}
