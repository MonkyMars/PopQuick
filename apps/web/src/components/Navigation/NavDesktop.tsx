import { FC } from "react";

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

export default NavDesktop;