"use client"
import { FC, useState } from "react";
import Image from "next/image";
import './/NavMobile.scss';
import React from 'react';



const NavMobile: FC = () => {
  interface User {
    name: string;
    image: string;
  }

  const user: User = {
    name: "User",
    image: "/test.jpeg",
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className="NavMobile__header">
        <h2>{"PopQuick"}</h2>
        <button
          className={`hamburger ${menuOpen ? "is-active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>
      <nav className={`NavMobile ${menuOpen ? "is-open" : ""}`}>
        <ul>
          <li>Home</li>
          <li>Favorites</li>
          <li>Location</li>
          {user.image && (
            <li>
              <Image
                src={user.image}
                alt={`${user.name}'s profile`}
                width={50}
                height={50}
              />
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default NavMobile;
