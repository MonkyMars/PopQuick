"use client";
import React, { useState, FormEvent } from "react";
import { type LoginUser } from "@/utils/user-service";
import { NavDesktop } from "@/components/components";
import "@/login.scss";
import { Button } from "@repo/ui/button";
import Head from "next/head";
import { NextPage } from "next";

const Login: NextPage = () => {
  const [credentials, setCredentials] = useState<LoginUser>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleGoogleLogin = () => {};
  const handleDiscordLogin = () => {};
  return (
    <>
		<Head>
			<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>	
		</Head>
      <NavDesktop />
      <div className="loginContainer">
        <form className="loginForm" onSubmit={handleLogin}>
          <h2>Login</h2>

          <div className="inputGroup">
					<label>{'Username'}</label>
            <input
              type="email"
              placeholder="Username or email..."
              value={credentials.username}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              required
              className="loginInput"
            />
          </div>

          <div className="inputGroup passwordGroup">
						<label>{'Password'}</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              required
              className="loginInput"
            />
            <button
              type="button"
              className="passwordToggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className="material-icons">
                {showPassword ? "visibility_off" : "visibility"}
              </i>
            </button>
          </div>

          <button type="submit" className="loginButton">
            Login
          </button>

          <div className="divider">
            <span>Or continue with</span>
          </div>

          <div className="socialLogin">
            <button
              type="button"
              className="googleButton"
              onClick={handleGoogleLogin}
            >
              <i className="material-icons">google</i>
              Google
            </button>
            <Button
              type="button"
              className="discordButton"
              onClick={handleDiscordLogin}
            >
              <i className="material-icons">discord</i>
              Discord
            </Button>
          </div>

          <div className="formFooter">
            <a href="/forgot-password">Forgot Password?</a> {/* no page on /forgot-password or /signup yet. */}
            <a href="/signup">Create Account</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
