import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Layout, Avatar } from 'antd';

// <Icon className="trigger" type={siderShow ? 'menu-unfold' : 'menu-fold'} onClick={toggleSider} />
class MainToolbar extends Component {
  render() {
    return (
      <Layout.Header {...this.props} style={{ background: '#fff', padding: '0 16px', display: 'flex', alignItems: 'center' }}>
        <span className="fill" />
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </Layout.Header>
    );
  }
}

export default MainToolbar;
