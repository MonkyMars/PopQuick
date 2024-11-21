import Head from "next/head";
import Image from "next/image";
import ".//components.scss";
import React, { FC } from "react";

// Define types for props
interface BannerProps {
  type: "info" | "error";
  message: string;
}

interface ButtonProps {
  content: string;
}

interface ConfirmationProps {
  type: "warning" | "info";
  message: string;
}

const NavDesktop: FC = () => {
  const user: string | null = null;
  return (
    <nav className="NavDesktop">
      <h2>{"PopQuick"}</h2>
      <ul>
        <li>{"Interests"}</li>
        <li>{"Location"}</li>
      </ul>
      {user ? (
        <div>
          <label>{user}</label>
        </div>
      ) : (
        <button>Login</button>
      )}
    </nav>
  );
};

const NavMobile: FC = () => {
  interface User {
    name: string;
    image: string;
  }
  const user: User = {
    name: "Levi",
    image: "/test.jpeg",
  };
  return (
    <>
      <header className="NavMobile__header">
        <h2>{"PopQuick"}</h2>
      </header>
      <nav className="NavMobile">
        <ul>
          <li className="material-icons">favorite</li>
          <li className="material-icons">place</li>
          <li className="material-icons">home</li>
          {!user.image ? (
            <li className="material-icons">person</li>
          ) : (
            <Image src={user.image} alt="" width={100} height={100} />
          )}
        </ul>
      </nav>
    </>
  );
};

const LoadingModal: FC = () => (
  <div className="LoadingModal">
    <div className="PopQuick">
      <Image
        src={"/pop.png"}
        alt="PopQuick"
        width={320}
        height={320}
        draggable={false}
      />
      <h1>{"PopQuick"}</h1>
    </div>
    <div className="Orbit">
      <Image
        src={"/orbit.png"}
        alt="Orbit"
        width={800}
        height={800}
        draggable={false}
      />
    </div>
  </div>
);

const Input: FC = () => (
  <input className="input" required minLength={3} />
);

const Button: FC<ButtonProps> = ({ content }) => (
  <button className="button">{content}</button>
);

const Banner: FC<BannerProps> = ({ type, message }) => (
  <div className={`Banner ${type.toLowerCase() === "error" ? "error" : "info"}`}>
    <i className="material-icons">
      {type.toLowerCase() === "error" ? "warning" : "info"}
    </i>
    <span>{message}</span>
  </div>
);

const Confirmation: FC<ConfirmationProps> = ({ type, message }) => (
  <div className="Confirmation">
    <div className="message">
      <i className="material-icons">
        {type.toLowerCase() === "warning" ? "warning" : "info"}
      </i>
      <span>{message}</span>
    </div>
    <div className="buttons">
      <button className="button">
        <i className="material-icons">check</i>
        <span>Confirm</span>
      </button>
      <button className="button">
        <i className="material-icons">cancel</i>
        <span>Cancel</span>
      </button>
    </div>
  </div>
);

// Export all components
export {
  NavDesktop,
  NavMobile,
  LoadingModal,
  Input,
  Button,
  Banner,
  Confirmation,
};
