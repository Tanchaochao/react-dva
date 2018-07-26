import React from 'react';
import { Layout } from 'antd';
import styles from './BasicLayout.m.scss';

const { Header, Sider, Content } = Layout;

export default ({ children }) => {
  return (
    <Layout className={styles.root}>
      <Sider className={styles.sider}>
        sider
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
