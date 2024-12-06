'use client'
import React, { useState, useEffect } from 'react';
import type { NextPage } from "next";
import BlobBorder from './blob/blob';
import "@/app/welcome/welcome.scss";
import Link from 'next/link';

const Welcome: NextPage = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = 'Welcome To PopQuick';

  useEffect(() => {
    const typeText = () => {
      if (isDeleting) {
        setText(prev => prev.slice(0, -1));
        if (text === '') setIsDeleting(false);
      } else {
        setText(prev => fullText.slice(0, prev.length + 1));
        if (text === fullText) setTimeout(() => setIsDeleting(true), 2000);
      }
    };

    const timer = setInterval(typeText, 100);
    return () => clearInterval(timer);
  }, [text, isDeleting]);

  return (
    <>
      <main className="MainContent">
        <BlobBorder>
          <header className="Header">
            <h1 className={isDeleting ? 'deleting' : 'typing'}>{text}</h1>
            <p>Your journey to new <strong>friendships</strong> starts now.</p>
            <Link href={'/signup'}><button>Sign up</button></Link>
          </header>
        </BlobBorder>
      </main>
    </>
  );
};

export default Welcome;

