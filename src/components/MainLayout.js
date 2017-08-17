import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Avatar, Badge, Dropdown, Icon } from 'antd';

class MainLayout extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    currentMenu: PropTypes.object.isRequired,
    menus: PropTypes.array.isRequired,
    treeMenus: PropTypes.array.isRequired,
    collapsed: PropTypes.bool.isRequired,
    openedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    logout: PropTypes.func.isRequired,
    toggleSidenav: PropTypes.func.isRequired,
    updateOpenedKeys: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  }

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

    const menuIcon = (menu.icon && <Icon type={menu.icon} />);
    return (
      <Menu.Item key={menu.id} >
        {menu.link ?
          <Link to={menu.link}>{menuIcon}<span>{menu.title}</span></Link> :
          <span>{menuIcon}<span>{menu.title}</span></span>
        }
      </Menu.Item>
    );
  }

  createBreadItems = menus => menus.map((m, i) => {
    const isLast = i === (menus.length - 1);

    let content;
    if (isLast || !m.link) {
      content = (<span>{m.title}</span>);
    } else {
      content = (<Link to={m.link}>{m.title}</Link>);
    }

    return (
      <Breadcrumb.Item key={m.id}>
        <Icon type={m.icon} />
        {content}
      </Breadcrumb.Item>
    );
  })

  renderSideMenu = () => {
    const items = this.props.treeMenus.map(this.createMenuItem);
    const currentMenu = this.props.currentMenu;
    const selectedKeys = [currentMenu.id && String(currentMenu.id)];

    return (
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={this.props.openedKeys}
        onOpenChange={this.props.updateOpenedKeys}
        inlineCollapsed={this.props.collapsed}
      >
        {items}
      </Menu>
    );
  };

  renderHanderMenu = () => (
    <Menu onClick={this.handerMenuClick} selectedKeys={[]}>
      <Menu.Item key="profile">我的</Menu.Item>
      <Menu.Item key="message">消息</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  )

  renderHeader = () => {
    const user = this.props.user;
    const headerMenu = this.renderHanderMenu();

    return (
      <Layout.Header>
        <span />
        <Dropdown overlay={headerMenu}>
          <Badge dot>
            <Avatar src={user.avatar}>{user.name || user.username}</Avatar>
          </Badge>
        </Dropdown>
      </Layout.Header>
    );
  };

  renderBreadcrumb = () => {
    const { currentMenu, menus } = this.props;
    const mapMenus = menus.reduce((map, menu) => ({ ...map, [menu.id]: menu }), {});
    let parentMenu = currentMenu;

    const breads = [];

    if (parentMenu) {
      breads.push(parentMenu);

      if (parentMenu.bpid) {
        while (mapMenus[parentMenu.bpid]) {
          parentMenu = mapMenus[parentMenu.bpid];
          breads.push(parentMenu);
        }
      }
    }

    const items = this.createBreadItems(breads.reverse());

    return (
      <Breadcrumb>
        {items}
      </Breadcrumb>
    );
  }

  render() {
    const sideMenu = this.renderSideMenu();
    const header = this.renderHeader();
    const breadcrumb = this.renderBreadcrumb();

    return (
      <Layout>
        <Layout.Sider
          collapsible
          collapsed={this.props.collapsed}
          onCollapse={this.props.toggleSidenav}
        >
          <div />
          {sideMenu}
        </Layout.Sider>
        <Layout>
          {header}
          <Layout.Content>
            {breadcrumb}
            <div>
              {this.props.children}
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;