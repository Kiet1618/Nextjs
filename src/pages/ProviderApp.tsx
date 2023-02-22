import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from "react-redux";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { store, useAppSelector } from "@app/store";
import { useSession } from 'next-auth/react';

const AppLayout = dynamic(() => import('../components/Layout'), { ssr: false });

export default function ProviderApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (router.pathname === '/wallet') {
        router.push('/wallet')
      }
      else if (router.pathname.includes('/overview')) {
        router.push('/overview')
      }
      else if (router.pathname.includes('/setting/profile')) {
        router.push('/setting/profile')
      }
      else {
        router.push('/overview')
      }

    }
    else {
      router.push('/')
    }
  }, [session])
  if (router.pathname != '/login') {
    return (
      <AppLayout>
        <Head>
          <title>d-Wallet</title>
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
          <title>d-Wallet</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}
