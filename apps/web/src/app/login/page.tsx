"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { type LoginUser } from "@/utils/user-service";
import NavDesktop from "@/components/Navigation/NavDesktop";
import Banner from "@/components/Banner/Banner";
import NavMobile from "@/components/Navigation/NavMobile";
import "@/app/login/login.scss";
import { Button } from "@repo/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { Eye, EyeClosed } from "lucide-react";
import { NextPage } from "next";

const Login: NextPage = () => {
  const [credentials, setCredentials] = useState<LoginUser>({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Get the API URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: credentials.identifier,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        throw new Error(errorData.message || "Login failed");
      }

      // Handle success (e.g., redirect, update state)
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleGoogleLogin = () => {
    // Add Google login logic here
  };

  const handleDiscordLogin = () => {
    // Add Discord login logic here
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(null);
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <>
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
              value={credentials.identifier}
              onChange={(e) =>
                setCredentials({ ...credentials, identifier: e.target.value })
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
              onFocus={(e) => e.target.classList.add("focused")}
              onBlur={(e) => e.target.classList.remove("focused")}
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
            <a href="/forgot-password">Forgot Password?</a>
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
            <a href="/signup">Don't have an account? Create account</a>
          </div>
        </form>
      </div>
      {error && <Banner type="error" message={error} />}
    </>
  );
};

export default Login;
