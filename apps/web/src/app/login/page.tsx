"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { type LoginUser } from "@/utils/user-service";
import NavDesktop from "@/components/Navigation/NavDesktop";
import Banner from "@/components/Banner/Banner";
import NavMobile from "@/components/Navigation/NavMobile";
import "@/app/login/login.scss";
import { Button } from "@repo/ui/button";
import { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { Eye, EyeClosed } from "lucide-react";
const Login: NextPage = () => {
  const [credentials, setCredentials] = useState<LoginUser>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // checking window width for nav responsiveness
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const url = "http://localhost:3001/api/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.username,
          password: credentials.password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        throw new Error(errorData.message || "Login failed");
      }

      // Handle successful login (e.g., store token, redirect)
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  const handleGoogleLogin = () => {};
  const handleDiscordLogin = () => {};

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  }, [error]);

  return (
    <>
      {isMobile ? <NavMobile /> : <NavDesktop />}

      <div className="loginContainer">
        <form className="loginForm" onSubmit={handleLogin}>
          <h2>Login</h2>

          <div className="inputGroup">
            <label aria-label="Username/email" htmlFor="username">
              Username or email
            </label>
            <input
              type="text"
              placeholder="Username or email..."
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              required
              className="loginInput"
              id="username"
            />
          </div>

          <div className="inputGroup passwordGroup">
            <label aria-label="Password" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
              className="loginInput"
              id="password"
            />
            <button
              type="button"
              className="passwordToggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye /> : <EyeClosed />}
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
              <FontAwesomeIcon icon={faGoogle} /> <label>Google</label>
            </button>
            <Button
              type="button"
              className="discordButton"
              onClick={handleDiscordLogin}
            >
              <FontAwesomeIcon icon={faDiscord} /> <label>Discord</label>
            </Button>
          </div>

          <div className="formFooter">
            <a href="/forgot-password">Forgot Password?</a>{" "}
            {/* Href's not active pages currently */}
            <a href="/signup">Create Account</a>
          </div>
        </form>
      </div>
      {error && <Banner type="error" message={error} />}
    </>
  );
};

export default Login;
