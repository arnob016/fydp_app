import { ReactNode } from 'react';
import Head from 'next/head';
import './globals.css';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>FishNet28</title>
      </Head>
      <header>
        <h1>Image Classification App</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
