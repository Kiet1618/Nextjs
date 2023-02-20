import { Button, Empty } from 'antd';
import React, { useState } from 'react';
import { testFunc } from './redux/actions';
import { useAppDispatch, useAppSelector } from '@app/store';
import { useSession } from 'next-auth/react';
export default function Overview() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const state = useAppSelector(state => state.overview);
  console.log();
  return (
    <div className='overview-page' style={{ textAlign: 'left' }}>
      <p>Count: {state.test.data}</p>
      <Button type='primary' onClick={() => {
        dispatch(testFunc({}));
      }} loading={state.test.loading}>Test Redux Func
      </Button>
      <div><b>ID token:</b> {session.id_token || ""}</div>
      <div> <b>email:</b> {session.user.email}</div>
      <Empty>
      </Empty>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const headers = req ? req.headers : {};
  return { props: { headers } }
}