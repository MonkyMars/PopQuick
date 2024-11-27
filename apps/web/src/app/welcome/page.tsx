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
            <h1>Welcome To <strong>P</strong>op<strong>Q</strong>uick</h1>
            <p>Your journey to new <strong>friendships</strong> starts now.</p>
            <p><strong>Sign up</strong> to get started, and find new friends</p>
            <Link href={'/signup'}><button>Sign up</button></Link>
          </header>
        </BlobBorder>
      </main>
    </>
  );
};

export default Welcome;