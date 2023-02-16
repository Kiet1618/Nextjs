import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from "react-redux";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { store, useAppSelector } from "@app/store";


const AppLayout = dynamic(() => import('../components/Layout'), { ssr: false });


export default function ProviderApp({ Component, pageProps }: AppProps) {
  const [idToken, setIdToken] = useState(null);
  const router = useRouter();
  const loginState = useAppSelector(state => state.auth);
  useEffect(() => {
    if (loginState.token.data) {
      router.push('/overview')
    }
    else {
      router.push('/login')
    }
  }, [loginState])
  if (router.pathname != '/login') {
    return (
      <AppLayout>
        <Head>
          <title>NextJs Antdesign Typescript</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </AppLayout>
    );
  }
  else {
    return (
      <>
        <Head>
          <title>NextJs Antdesign Typescript</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}
