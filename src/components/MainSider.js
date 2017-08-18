import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

class MainSider extends Component {
  static propTypes = {
    // state
    collapsed: PropTypes.bool.isRequired,
    currentMenu: PropTypes.object,
    treeMenus: PropTypes.array.isRequired,
    openedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,

    // action
    updateOpenedKeys: PropTypes.func.isRequired,
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
        {menu.link
          ? <Link to={menu.link}>{menuIcon}<span>{menu.title}</span></Link>
          : <span>{menuIcon}<span>{menu.title}</span></span>
        }
      </Menu.Item>
    );
  }

  renderSideMenu = () => {
    const items = this.props.treeMenus.map(this.createMenuItem);
    const currentMenu = this.props.currentMenu;
    const selectedKeys = [currentMenu && String(currentMenu.id)];

    return (
      <Menu
        className="main-menu"
        theme="light"
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

  render() {
    const sideMenu = this.renderSideMenu();

    return (
      <Layout.Sider
        className="main-sider"
        collapsible
        trigger={null}
        collapsed={this.props.collapsed}
      >
        <div />
        {sideMenu}
      </Layout.Sider>
    );
  }
}

export default MainSider;
