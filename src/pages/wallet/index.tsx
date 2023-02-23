import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Input,
  InputNumber,
  Select,
  Button
} from 'antd';
import styled from 'styled-components';
const { Option } = Select;
const Tranfer = styled.form`
  margin: 40px;
  border: solid 1px rgb(102,114,154, 0.8);
  width: 600px;
  height: 530px;
  display: inline-block;
  float: left;
  margin: 40px;
  padding: 20px;
  border-radius: 5px;
`;
const CardBalance = styled.div`
      width: 500px;
      border: solid 1px rgb(102,114,154, 0.8);
      margin: 40px;
      border-radius: 5px;
      height: 200px;
      padding: 20px;
      display: inline-block;
`;

const ETHNumber = styled.div`
    font-size: 40px;
    margin-right: 10px;
    margin-left: 5px;
    display: inline-block;
    float: left;
    margin-top: 20px;;
`;

export default function App() {
  const { data: session } = useSession();

  return (
    <div>
      <Tranfer>
        <h2 style={{ color: 'white' }} >Tranfer</h2>


      </Tranfer>
      <CardBalance>
        <h1 style={{ color: 'white' }}>Account Balance</h1>
        <ETHNumber>0.321</ETHNumber>
        <p style={{ marginTop: '57px' }}>ETH</p>
      </CardBalance>
    </div >
  )
}

export async function getServerSideProps({ req }) {
  const headers = req ? req.headers : {};
  return { props: { headers } }
}