import React, { PureComponent } from 'react';
import { Menu } from 'antd';
import { Link } from 'dva/router';

/**
 * /list/search/articles = > ['list','/list/search']
*/
function urlToList(url) {
  const list = url.split('/').filter(i => i);
  return list.reduce((urlList, name) => {
    return urlList.concat(`${urlList[urlList.length - 1] || ''}/${name}`);
  }, []);
}

class SideMenu extends PureComponent {
  constructor(props) {
    super(props);
    const selectedKeys = this.getSelectedKeys();
    this.state = {
      selectedKeys,
    };
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.location.pathname !== this.props.location.pathname) {
      const selectedKeys = this.getSelectedKeys(nextProp);
      this.setState({
        selectedKeys,
      });
    }
  }

  getSelectedKeys = (nextProps) => {
    const { location: { pathname } } = nextProps || this.props;
    return urlToList(pathname);
  }

  renderItem = (item) => {
    if (item.children) {
      return this.renderSubMenu(item);
    }
    return (
      <Menu.Item key={item.path}>
        <Link to={item.path}>{item.title}</Link>
      </Menu.Item>
    );
  }

  renderSubMenu = (item) => {
    return (
      <Menu.SubMenu title={item.title} key={item.path}>
        {item.children.map((_item) => {
          return this.renderItem(_item);
        })}
      </Menu.SubMenu>
    );
  }

  render() {
    const { tree } = this.props;
    const { selectedKeys } = this.state;
    return (
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
      >
        {tree.map((item) => {
          return this.renderItem(item);
        })}
      </Menu>
    );
  }
}

export default SideMenu;
