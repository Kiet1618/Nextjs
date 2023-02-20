import React, { useState } from 'react';
import { Skeleton, Empty, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';

const { Meta } = Card;
import styled from 'styled-components';
const Profile = styled.div`
       display: inline-block;
    /* text-align: center; */
    margin-left: 25%;
    border: 2px solid #ccc;
    height: 60vh;
`;
export default function App() {

  const { data: session } = useSession();

  return (
    <Profile >
      <Card
        style={{ width: '600px', textAlign: 'center' }}
        cover={
          <img
            style={{ borderRadius: '50%', width: '200px', marginLeft: '200px', marginTop: '50px' }}
            alt="image"
            src={session.user.image}
          />
        }
      >
        <Meta
          //avatar={<Avatar src={session.user.image} />}
          title={session.user.name}
          description={session.user.email}
        />
      </Card>
    </Profile >
  )
}

export async function getServerSideProps({ req }) {
  const headers = req ? req.headers : {};
  return { props: { headers } }
}