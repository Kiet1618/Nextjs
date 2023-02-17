import React, { useState } from 'react';
import {
  Input,
  InputNumber,
  Select,
  Button
} from 'antd';
const { Option } = Select;
import './wallet.css';
export default function App() {
  return (
    <div>
      <form className='tranfer-control'>
        <h2 >Tranfer</h2>

        <Input.Group compact>
          <Select defaultValue="eth">
            <Option value="eth">ETH Address</Option>
            <Option value="email">Email Google</Option>
          </Select>
          <Input style={{ width: '300px' }} placeholder="Address" />
          <InputNumber defaultValue={1}
            formatter={(value) => `♦ ${value}`}
          />

          <Button style={{ width: 90 }} type="primary" >Send</Button>
        </Input.Group>
      </form>
    </div >
  )
}

export async function getServerSideProps({ req }) {
  const headers = req ? req.headers : {};
  return { props: { headers } }
}