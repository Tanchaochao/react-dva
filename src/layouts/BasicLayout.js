import React from 'react';
import { Layout } from 'antd';
import styles from './BasicLayout.m.scss';
import SideMemu from '@/components/SideMenu';
import getMenuData from '@/config/menu';

const { Header, Sider, Content } = Layout;

export default ({ children, location }) => {
  return (
    <Layout className={styles.root}>
      <Sider className={styles.sider}>
        <SideMemu
          location={location}
          tree={getMenuData()}
        />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          header
        </Header>
        <Content className={styles.content}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
