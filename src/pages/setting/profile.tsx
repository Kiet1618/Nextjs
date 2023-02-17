import React, { useState } from 'react';
import { Skeleton, Empty, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';


const { Meta } = Card;
import './profile.css';
export default function App() {
  const { data: session } = useSession();

  return (
    <div id="profile-page">
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="image"
            src={session.user.image}
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src={session.user.image} />}
          title={session.user.name}
          description={session.user.email}
        />
      </Card>
    </div >
  )
}

export async function getServerSideProps({ req }) {
  const headers = req ? req.headers : {};
  return { props: { headers } }
}