import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from "react-redux";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { store, useAppSelector } from "@app/store";
import 'antd/dist/antd.css';

const AppLayout = dynamic(() => import('../components/Layout'), { ssr: false });




export default function MyApp({ Component, pageProps }: AppProps) {
  const [idToken, setIdToken] = useState(null);
  const router = useRouter();
  //const loginState = useAppSelector(state => state.auth);

  useEffect(() => {
    if (!idToken) {
      router.push('/login')
    } else {
      router.push('/overview')
    }
  })
  if (idToken) {
    return (
      <ReduxProvider store={store}>
        <AppLayout>
          <Head>
            <title>NextJs Antdesign Typescript</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <Component {...pageProps} />
        </AppLayout>
      </ReduxProvider>
    );
  }
  else {
    return (
      <ReduxProvider store={store}>
        <Head>
          <title>NextJs Antdesign Typescript</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </ReduxProvider>
    );
  }
}
