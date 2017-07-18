import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Icon } from 'antd';
import './style';

class MainLayout extends Component {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    treeMenu: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.any.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
      link: PropTypes.string,
    }).isRequired).isRequired,
    collapsed: PropTypes.bool.isRequired,
    selectedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    openedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    logout: PropTypes.func.isRequired,
    toggleSidenav: PropTypes.func.isRequired,
    updateSelectedKeys: PropTypes.func.isRequired,
    updateOpenedKeys: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  }

  handlerSelect = ({ selectedKeys }) => this.props.updateSelectedKeys(selectedKeys)

  handerMenuClick = ({ key }) => {
    if (key === 'logout') {
      this.props.logout();
    }
  }

  createMenuItem = (menu) => {
    if (menu.children && Array.isArray(menu.children)) {
      const items = menu.children.map(this.createMenuItem);
      return (
        <Menu.SubMenu
          key={menu.id}
          title={<span><Icon type={menu.icon} /><span>{menu.title}</span></span>}
        >
          {items}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item key={menu.id} >
        {menu.link ?
          <Link to={menu.link}><Icon type={menu.icon} />{menu.title}</Link> :
          <span><Icon type={menu.icon} />{menu.title}</span>
        }
      </Menu.Item>
    );
  }

  renderSideMenu = () => {
    const items = this.props.treeMenu.map(this.createMenuItem);
    return (
      <Menu
        className="main-menu"
        theme="dark"
        mode="inline"
        selectedKeys={this.props.selectedKeys}
        openKeys={this.props.openedKeys}
        onSelect={this.handlerSelect}
        onOpenChange={this.props.updateOpenedKeys}
      >
        {items}
      </Menu>
    );
  };

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
          <Layout.Content className="main-container">
            {breadcrumb}
            <div className="main-content-wrapper">
              {this.props.children}
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;
