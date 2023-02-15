import { Button } from 'antd';
import React, { useState } from 'react';
import { testFunc } from './redux/actions';
import { useAppDispatch, useAppSelector } from '@app/store';

export default function Overview() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.overview);
  return (
    <div>
      <p>Count: {state.test.data}</p>
      <Button type='primary' onClick={() => {
        dispatch(testFunc({}));
      }} loading={state.test.loading}>Test Redux Func
      </Button>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const headers = req ? req.headers : {};
  return { props: { headers } }
}