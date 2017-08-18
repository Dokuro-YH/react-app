import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Breadcrumb, Icon } from 'antd';

class MainBreadcrumb extends Component {
  static propTypes = {
    currentMenu: PropTypes.object,
    menus: PropTypes.array.isRequired,
  }

  createBreadItems = menus => menus.map((m, i) => {
    const isLast = i === (menus.length - 1);
    return (
      <Breadcrumb.Item key={m.id}>
        {isLast || !m.link
          ? <span><Icon type={m.icon} />{m.title}</span>
          : <Link to={m.link}><Icon type={m.icon} />{m.title}</Link>}
      </Breadcrumb.Item>
    );
  })

  render() {
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
      <Breadcrumb className="main-breadcrumb">
        {items}
      </Breadcrumb>
    );
  }
}

export default MainBreadcrumb;
