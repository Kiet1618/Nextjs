import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Input,
  InputNumber,
  Select,
  Button,
  message
} from 'antd';
import styled from 'styled-components';



const { Option } = Select;
const Tranfer = styled.form`
    border: solid 1px rgb(100,100,100);
    width: 600px;
    height: 530px;
    display: inline-block;
    float: left;
    margin: 0px 40px;
    padding: 30px;
    border-radius: 5px;
    text-align: center;
    background-color: #292929;
  `;
const SelectCustom = styled(Select)`
   color: #FFFFFF;
    width: 450px;
    text-align: left;
    margin-bottom:30px ;
    .ant-select-selector{
      height: 50px !important;
      border-radius: 5px !important;
      background-color: #202020 !important;

    }
    .ant-select-selection-item{
      height: 50px !important;
      padding-top: 9px !important;
      font-size: 18px;
    
    }
    .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: solid 1px rgb(100,100,100) !important;
    background-color: #292929 !important;
    border-radius: 5px !important;
    }
    &:hover{
    }
    svg{
      fill: #fff !important;
    }
    
  `;
const OptionCustom = styled(Option)`

    &:after {
    height: 50px;
    background-color: #292929;
    border-radius: 5px;
    padding: 10px;
    }
  `;
const InputCustom = styled(Input)`
        width: 250px;
        font-size: 16px;
        margin-left: 45px;
        height: 50px;
        float: left;
        border-radius: 5px;
        background-color: #202020;
        color: #fff;
        display: inline-block;
        margin-bottom: 30px;
`;
const InputCustom2 = styled(Input)`
        width: 150px;
        font-size: 16px;
        margin-left: 45px;
        height: 50px;
        float: left;
        border-radius: 5px;
        background-color: #202020;
        color: #fff;
        display: inline-block;
`;
const GasFeeTag = styled.div`
        width: 245px;
        font-size: 16px;
        height: 50px;
        border-radius: 5px;
        background-color: #303030;
        color: #fff;
        display: inline-block;
        border: solid 1px rgb(255,255,255) !important;

`;

const SelectCustom2 = styled(Select)`
    color: #FFFFFF;
    width: 150px;
    text-align: left;
    display: inline-block;
    float: right;
    margin-right: 45px;
    .ant-select-selector{
      height: 50px !important;
      border-radius: 5px !important;
      background-color: #202020 !important;

    }
    .ant-select-selection-item{
      height: 50px !important;
      padding-top: 9px !important;
      font-size: 16px;
    } 
    .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: solid 1px rgb(100,100,100) !important;
    background-color: #292929 !important;
    border-radius: 5px !important;
    }
    &:hover{
    }
    svg{
      fill: #fff !important;
    }
    
  `;

const CardBalance = styled.div`
        width: 500px;
        border: solid 1px rgb(100,100,100);
        margin: 0px 40px;

        border-radius: 5px;
        height: 200px;
        padding: 30px;
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
const ButtonOrigin = styled.button`
border-radius: 6px;
background-color: #505050;
color: white;
cursor: pointer;

`;
export default function App() {
  const { data: session } = useSession();

  return (
    <div>
      <h2 style={{ color: 'white', margin: '20px 40px' }} >Tranfer Detail</h2>
      <Tranfer>
        <label htmlFor="SelectCustom" style={{ float: 'left', marginLeft: '50px', marginBottom: '5px' }}>Select token</label><br></br>
        <SelectCustom defaultValue="ETH">
          <OptionCustom value="ETH">ETH</OptionCustom>
          <OptionCustom value="USDT">USDT</OptionCustom>
        </SelectCustom>
        <br></br>
        <label htmlFor="InputCustom" style={{ marginRight: '380px' }}>Address</label>
        <InputCustom placeholder='Address'></InputCustom>
        <SelectCustom2 defaultValue="address">
          <OptionCustom value='address'>ETH Address</OptionCustom>
          <OptionCustom value='email'>Email Google</OptionCustom>
        </SelectCustom2>
        <label style={{ marginRight: '300px', width: '100px' }}>Amount</label>
        <label htmlFor="GasFeeTag" style={{}}>Max Fee Gas</label>

        <InputCustom2></InputCustom2>

        <GasFeeTag></GasFeeTag>
        <ButtonOrigin style={{ width: 150, marginRight: '50px', float: 'right', marginTop: 50, borderRadius: 5, height: 50, fontSize: '18px' }} >Transfer</ButtonOrigin>

      </Tranfer>
      <CardBalance>
        <h1 style={{ color: 'white' }}>Account Balance</h1>
        <ETHNumber>{0.01203}</ETHNumber>
        <p style={{ marginTop: '57px' }}>ETH</p>
      </CardBalance>

    </div >
  )
}

export async function getServerSideProps({ req }) {
  const headers = req ? req.headers : {};
  return { props: { headers } }
}