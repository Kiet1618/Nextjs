import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from "react-redux";

import { store } from "@app/store";
import 'antd/dist/antd.css';

const AppLayout = dynamic(() => import('../components/Layout'), { ssr: false });

export default function MyApp({ Component, pageProps }: AppProps) {
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
