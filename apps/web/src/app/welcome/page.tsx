import React from 'react';
import type { NextPage } from "next";
import BlobBorder from './blob/blob';
import "@/app/welcome/welcome.scss";
import Link  from 'next/link';

const Welcome: NextPage = () => {
  return (
    <>
      <main className="MainContent">
        <BlobBorder>
          <header className="Header">
            <h1>Welcome To PopQuick</h1>
            <p>Sign up to get started, and find new friends</p>
            <Link href={'/signup'}><button>Sign up</button></Link>
          </header>
        </BlobBorder>
      </main>
    </>
  );
};

export default Welcome;