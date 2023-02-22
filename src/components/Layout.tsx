import React, { useState, FunctionComponent } from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import styled from "styled-components"
import Link from 'next/link';
import { withRouter, NextRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { useSession, signIn, signOut } from "next-auth/react"

import {
  SettingOutlined,
  WalletOutlined,
  HomeOutlined
} from '@ant-design/icons';


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
      <a style={{ color: 'white' }}>{route.breadcrumbName}</a>
    </Link>
  ) : (
    <span style={{ color: 'white' }}>{route.breadcrumbName}</span>
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
      <Sider style={{ textAlign: 'center' }}
        collapsible
        collapsed={isCollapsed}
        onCollapse={onChangeIsCollapsed}
      >
        <Link href="/overview" >
          <a style={{ color: 'Gray' }}>
            <img src='/LecleLogoMini.png'></img>
            <strong>d-Wallet</strong>
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
          <SubMenu key="setting" icon={<SettingOutlined />} title="Setting" >
            <Item key="profile" >
              <Link href="/setting/profile" >
                <a>Profile</a>
              </Link>
            </Item>
            <Item key="logout">
              <Link href="/setting/logout">
                <a onClick={() => signOut()}>Log out</a>
              </Link>
            </Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 16px 16px', backgroundColor: '#0C1031', color: 'white', width: '100%' }}>
        <BreadcrumbCustom
          style={{ margin: '16px 0' }}
          itemRender={itemRender}
          routes={routes}
        />
        <Content
          //className="site-layout-background"
          style={{

            padding: 16,
            minHeight: 280,
            backgroundImage: 'url(/bgContent.png)',
            backgroundSize: "100% 100%",
            overflow: 'hidden'
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout >
  );
};
const BreadcrumbCustom = styled(Breadcrumb)`
  
  .ant-breadcrumb-separator {
    color: #FFF;
  }
`
export default withRouter(AppLayout);
