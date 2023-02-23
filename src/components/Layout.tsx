import React, { useState, FunctionComponent } from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import styled from "styled-components"
import Link from 'next/link';
import router, { withRouter, NextRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import {
  SettingOutlined,
  WalletOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { Dropdown, message, Space, Tooltip } from 'antd';



const handleMenuClick: MenuProps['onClick'] = (e) => {
  if (e.key == 'logout') {
    signOut()
  }
  else router.push('/' + e.key);
};
const items: MenuProps["items"] = [
  {
    label: 'Profile',
    key: 'setting/profile',
    icon: <UserOutlined />,
  },
  {
    label: 'Log Out',
    key: 'logout',
    icon: <LogoutOutlined />,
  },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};
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
  const { data: session } = useSession();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const onChangeIsCollapsed = (isCollapsed: boolean) => {
    setIsCollapsed(isCollapsed);
  };

  const pathname = props.router.pathname;
  const pathsplit: string[] = pathname.split('/');
  const routes = routesMaker(pathsplit);
  const router = useRouter();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ textAlign: 'center' }}
        collapsible
        collapsed={isCollapsed}
        onCollapse={onChangeIsCollapsed}
      >
        <Link href="/overview" >
          <a>
            <img src='/LecleLogoMini.png'></img>
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
        >
        </BreadcrumbCustom>
        <Dropdown.Button style={{ margin: 12, marginLeft: '154vh', position: 'absolute', borderStyle: 'none', backgroundColor: '#0C1031' }} menu={menuProps} placement="bottomRight" icon={<img style={{ borderRadius: '50%' }} width={26} src={session ? session.user.image : ""} />}>
          {session ? session.user.name : ""}
        </Dropdown.Button>
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
  display: inline-block;
  div{
    display: inline-block;
    float: left;
  }
  width: max-content;
  
`;
export default withRouter(AppLayout);
{/* <p style={{ margin: 15, marginRight: '60px', right: 0, position: 'absolute' }} >{session ? session.user.name : ""}</p>
<a onClick={() => console.log('a')} style={{ right: 0, position: 'absolute' }}> <img style={{ borderRadius: '50%', margin: 10, marginRight: '16px', right: 0, position: 'absolute' }} width={30} src={session ? session.user.image : ""} /></a> */}

