import { FC } from "react";
import './/NavDesktop.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMapMarkerAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const NavDesktop: FC = () => {
  const user: string | null = null;

  return (
    <nav className="NavDesktop">
      <h2>{"PopQuick"}</h2>
      <ul>
        <li>
          <FontAwesomeIcon icon={faHeart} />
          <span>{"Interests"}</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span>{"Location"}</span>
        </li>
      </ul>
      {user ? (
        <div className="user-info">
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
          <label>{user}</label>
        </div>
      ) : (
        <button>
          <FontAwesomeIcon icon={faUserCircle} />
          {" Login"}
        </button>
      )}
    </nav>
  );
};

export default NavDesktop;
