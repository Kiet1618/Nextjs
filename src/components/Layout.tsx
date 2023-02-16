import React, { useState, FunctionComponent } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Link from 'next/link';
import { withRouter, NextRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

import {
  DesktopOutlined,
  DashboardOutlined,
  SettingOutlined,
  WalletOutlined,
  HomeOutlined
} from '@ant-design/icons';

import './Layout.css';

const { SubMenu, Item } = Menu;
const { Sider, Content } = Layout;

interface Router extends NextRouter {
  path: string;
  breadcrumbName: string;
}

interface Props extends WithRouterProps {
  router: Router;
}

function itemRender(route: Router) {
  return route.path === 'index' ? (
    <Link href={'/'}>
      <a>{route.breadcrumbName}</a>
    </Link>
  ) : (
    <span>{route.breadcrumbName}</span>
  );
}

function routesMaker(pathsplit: string[]) {
  let routes = [
    {
      path: 'index',
      breadcrumbName: 'home',
    },
  ];
  for (let v of pathsplit) {
    const pathInfo = {
      path: v,
      breadcrumbName: v,
    };
    if (v !== '') routes.push(pathInfo);
  }
  return routes;
}

const AppLayout = (props: React.PropsWithChildren<Props>) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onChangeIsCollapsed = (isCollapsed: boolean) => {
    setIsCollapsed(isCollapsed);
  };

  const pathname = props.router.pathname;
  const pathsplit: string[] = pathname.split('/');
  const routes = routesMaker(pathsplit);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={isCollapsed}
        onCollapse={onChangeIsCollapsed}
      >
        <Link href="/menu1">
          <a>
            <div className="App-logo" />
          </a>
        </Link>
        <Menu
          theme="dark"
          defaultSelectedKeys={['/overview']}
          selectedKeys={[pathsplit.pop()]}
          defaultOpenKeys={[pathsplit[1]]}
          mode="inline"
        >
          <Item key="overview" icon={<HomeOutlined />}>
            <Link href="/overview">
              <a>Overview</a>
            </Link>
          </Item>

          <Item key="wallet" icon={<WalletOutlined />}>
            <Link href="/wallet">
              <a>Wallet</a>
            </Link>
          </Item>
          <SubMenu key="setting" icon={<SettingOutlined />} title="Setting">
            <Item key="submenu1">
              <Link href="/setting/submenu1">
                <a>Submenu 1</a>
              </Link>
            </Item>
            <Item key="submenu2">
              <Link href="/setting/submenu2">
                <a>Submenu 2</a>
              </Link>
            </Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 16px 16px' }}>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          itemRender={itemRender}
          routes={routes}
        />
        <Content
          className="site-layout-background"
          style={{
            padding: 16,
            minHeight: 280,
            backgroundColor: '#ffffff',
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(AppLayout);
