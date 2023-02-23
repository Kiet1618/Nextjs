import { Button, Empty } from 'antd';
import React, { useState } from 'react';
import { testFunc } from './redux/actions';
import { useAppDispatch, useAppSelector } from '@app/store';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';

const CardBalance = styled.div`
      width: 500px;
      border: solid 1px rgb(102,114,154, 0.8);
      margin: 40px;
      border-radius: 5px;
      height: 200px;
      padding: 20px;
      display: inline-block;
`;
const Output = styled.output`
      display: inline-block;
      width: 300px;
      height: 30px;
      border: solid 1px rgb(102,114,154, 0.8);
      border-radius: 5px;
      margin-top: 20px;
      padding: 3px;
      padding-left: 15px;
`;
const SelectNetwork = styled.select`
  color: #000;
  background-color: #C6D1DB;
  font-size: 10px;
  margin-left: 25px; 
  border-radius: 5px;
  position: absolute;
  margin-top: 20px;
`;
const C6D1DBOption = styled.option`
  background-color: #C6D1DB;
  color: #000;
`;
const ETHNumber = styled.div`
    position: absolute;
    margin-left: 30px;
    font-size: 40px;
    display: inline-block;
`;
export default function Overview() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const state = useAppSelector(state => state.overview);
  return (
    <div style={{ textAlign: 'left', color: 'white' }}>
      <CardBalance>
        <h1 style={{ color: 'white' }}>Account Balance</h1>
        <Output>{session.user.email}</Output>
        <SelectNetwork >
          <C6D1DBOption value="Ethereum">Main Ethereum Network</C6D1DBOption>
          <C6D1DBOption value="Goerli">Goerli Test Network</C6D1DBOption>
        </SelectNetwork>
        <Output>Address ETH</Output>
        <ETHNumber>0 ETH</ETHNumber>
      </CardBalance>
    </div >
  )
}


export async function getServerSideProps({ req }) {
  const headers = req ? req.headers : {};
  return { props: { headers } }
}