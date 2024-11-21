import { FC } from "react";
import Image from "next/image";

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

export default NavMobile;