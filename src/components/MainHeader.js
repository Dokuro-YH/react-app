import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Avatar, Dropdown, Icon } from 'antd';

class MainHeader extends Component {
  static propTypes = {
    // state
    logout: PropTypes.func.isRequired,
    collapsed: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,

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
          className="main-header-trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.handleTriggerClick}
        />}
        <span className="fill" />
        <Dropdown trigger={['click']} overlay={this.renderHanderMenu()}>
          <a className="main-header-avatar">
            <Avatar className="user-avatar" src={user.avatar}>{(user.name || user.username).toUpperCase()}</Avatar>
            <span>{user.name || user.username}<Icon type="down" /></span>
          </a>
        </Dropdown>
      </div>
    );
  }
}

export default MainHeader;
