import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Avatar, Badge, Dropdown, Icon } from 'antd';

class MainHeader extends Component {
  static propTypes = {
    // state
    logout: PropTypes.func.isRequired,
    collapsed: PropTypes.bool.isRequired,
    user: PropTypes.object,

    // action
    toggleSidenav: PropTypes.func,
  }

  handerMenuClick = ({ key }) => {
    if (key === 'logout') {
      this.props.logout();
    }
  }

  handleTriggerClick = () => {
    const { collapsed, toggleSidenav } = this.props;
    if (toggleSidenav) {
      toggleSidenav(!collapsed);
    }
  }

  renderHanderMenu = () => (
    <Menu onClick={this.handerMenuClick} selectedKeys={[]}>
      <Menu.Item key="profile">我的</Menu.Item>
      <Menu.Item key="message">消息</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  )

  render() {
    const { user, collapsed, toggleSidenav } = this.props;
    return (
      <div className="main-header">
        {toggleSidenav && <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.handleTriggerClick}
        />}
        <span className="fill" />
        {user && <Dropdown overlay={this.renderHanderMenu()}>
          <Badge dot>
            <Avatar src={user.avatar}>{user.name || user.username}</Avatar>
          </Badge>
        </Dropdown>}
      </div>
    );
  }
}

export default MainHeader;
