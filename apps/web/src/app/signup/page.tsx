"use client";
import React, { useState, useRef, FormEvent } from "react";
import "@/app/signup/signup.scss";
import { Button } from "@repo/ui/button";
import { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { Check, X } from "lucide-react";
import { passwordRequirements } from "@/utils/password-validation";
import validator from "validator";
import Link from "next/link";
import { Eye, EyeClosed } from "lucide-react";

interface ValidationErrors {
  email?: string;
  password?: string;
}

const Signup: NextPage = () => {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    date: String(new Date(0)),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formPageIndex, setFormPageIndex] = useState(0);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [validRequirements, setValidRequirements] = useState<string[]>([]);

  const validatePassword = (password: string): boolean => {
    const validRequirements = passwordRequirements
      .filter((req) => req.validator(password))
      .map((req) => req.id);

    setValidRequirements(validRequirements);

    const isValid = validRequirements.length === passwordRequirements.length;

    if (!isValid) {
      setErrors((prev) => ({
        ...prev,
        password: "Please meet all password requirements",
      }));
      passwordInputRef.current?.focus();;
    } else {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }

    return isValid;
  };

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleContinue = (e: FormEvent) => {
    e.preventDefault();
    const isEmailValid = validator.isEmail(user.email);
    const isPasswordValid = validatePassword(user.password);

    if (isEmailValid && isPasswordValid) {
      setFormPageIndex(1);
    }
  };

  const handleGoogleSignup = () => {};
  const handleDiscordSignup = () => {};

  return (
    <>
      <div className="signupContainer">
        <form className="signupForm" onSubmit={handleSignup}>
          <h2>{"Sign up"}</h2>
          {formPageIndex === 0 && (
            <>
              <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className={`signupInput ${errors.email ? "error" : ""}`}
                  placeholder="e.g, johndoe@example.com"
                  value={user.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                    validator.isEmail(e.target.value);
                  }}
                  required
                  id="email"
                />
                {errors.email && (
                  <span className="errorMessage">{errors.email}</span>
                )}
              </div>
              <div className="inputGroup passwordGroup">
                <label aria-label="Password" htmlFor="password">
                  Password
                </label>
                <input
                  ref={passwordInputRef}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                    validatePassword(e.target.value);
                  }}
                  required
                  className={`signupInput ${errors.password ? "error" : ""}`}
                  id="password"
                />
                <button
                  type="button"
                  className="passwordToggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>

                <div className="password-requirements">
                  <ul>
                    {passwordRequirements.map((req) => (
                      <li
                        key={req.id}
                        className={`requirement ${validRequirements.includes(req.id) ? "valid" : ""}`}
                      >
                        <span className="icon">
                          {validRequirements.includes(req.id) ? (
                            <Check className="check" size={16} />
                          ) : (
                            <X className="x" size={16} />
                          )}
                        </span>
                        <span className="text">{req.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button className="signupButton" onClick={handleContinue}>
                Continue
              </button>
              <div className="divider">
                <span>Or continue with</span>
              </div>

              <div className="socialSignup">
                <button
                  type="button"
                  className="googleButton"
                  onClick={handleGoogleSignup}
                >
                  <FontAwesomeIcon icon={faGoogle} /> Google
                </button>
                <Button
                  type="button"
                  className="discordButton"
                  onClick={handleDiscordSignup}
                >
                  <FontAwesomeIcon icon={faDiscord} /> Discord
                </Button>
              </div>

              <div className="formFooter">
                <Link href="/login">Already have an account? Login!</Link>
              </div>
            </>
          )}
          {formPageIndex === 1 && (
            <>
              <div className="inputGroup">
                <label htmlFor="date" aria-label="Date of birth">
                  {"Date of birth"}
                </label>
                <input
                  type="date"
                  className="signupInput"
                  id="date"
                  required
                  value={user.date}
                  onChange={(e) => setUser({ ...user, date: e.target.value })}
                />
              </div>
              <div className="inputGroup">
                <label htmlFor="username" aria-label="username">
                  {"Username"}
                </label>
                <input
                  type="text"
                  className="signupInput"
                  id="username"
                  required
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </div>
              <Button className="signupButton" type="submit">
                {"Sign up"}
              </Button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Signup;
