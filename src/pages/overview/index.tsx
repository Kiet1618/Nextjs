import { Button, Empty } from 'antd';
import React, { useState } from 'react';
import { testFunc } from './redux/actions';
import { useAppDispatch, useAppSelector } from '@app/store';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';

export default function Overview() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const CardBalance = styled.div`
      width: 500px;
      border: solid 1px rgb(100,100,100);
      box-shadow: 0 0 10px rgb(80,80,80, 0,2);
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
  const state = useAppSelector(state => state.overview);
  return (
    <div style={{ textAlign: 'left', color: 'white' }}>
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