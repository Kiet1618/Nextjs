import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from "react-redux";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { store, useAppSelector } from "@app/store";
import ProviderApp from "./ProviderApp"
import 'antd/dist/antd.css';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';



export default function MyApp(props: AppProps & { session: Session }) {
  return (
    <ReduxProvider store={store}>
      <SessionProvider session={props.session}>
        <ProviderApp  {...props} />
      </SessionProvider>
    </ReduxProvider>
  )
}
