import React, { useState } from 'react';
import { Skeleton, Empty, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from "next-auth/react"

const { Meta } = Card;
import styled from 'styled-components';
const Profile = styled.div`
    display: inline-block;
    border: solid 1px rgb(100,100,100);
    height: 500px;
    width: 500px;
    text-align: center;
    margin: 40px;
    border-radius: 5px;
`;
export default function App() {

  const { data: session } = useSession();

  return (
    <Profile >

      <img
        style={{ borderRadius: '50%', width: '200px', marginTop: '30px', marginBottom: '30px' }}
        alt="image"
        src={session.user.image}
      />
      <h2 style={{ color: 'white' }}>{session.user.name}</h2>
      <h3 style={{ color: 'white' }}>{session.user.email}</h3>


    </Profile >
  )
}

export async function getServerSideProps({ req }) {
  const headers = req ? req.headers : {};
  return { props: { headers } }
}