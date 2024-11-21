"use client";
import React, { useState, useEffect, FormEvent } from "react";
import NavDesktop from "@/components/Navigation/NavDesktop";
import NavMobile from "@/components/Navigation/NavMobile";
import "@/app/signup/signup.scss";
import { Button } from "@repo/ui/button";
import { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { Check, X } from "lucide-react";

interface ValidationErrors {
  email?: string;
  password?: string;
}

interface PasswordRequirement {
  id: string;
  text: string;
  validator: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    id: "length",
    text: "At least 8 characters",
    validator: (password) => password.length >= 8,
  },
  {
    id: "uppercase",
    text: "One uppercase letter",
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    id: "lowercase",
    text: "One lowercase letter",
    validator: (password) => /[a-z]/.test(password),
  },
  {
    id: "number",
    text: "One number",
    validator: (password) => /\d/.test(password),
  },
  {
    id: "special",
    text: "One special character",
    validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

const Signup: NextPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    date: String(new Date(0)),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [signupPage, setSignupPage] = useState(0);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [validRequirements, setValidRequirements] = useState<string[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!email) {
      setErrors(prev => ({ ...prev, email: "Email is required" }));
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
      return false;
    }
    
    setErrors(prev => ({ ...prev, email: undefined }));
    return true;
  };

  const validatePassword = (password: string): boolean => {
    const validRequirements = passwordRequirements
      .filter(req => req.validator(password))
      .map(req => req.id);
    
    setValidRequirements(validRequirements);
    
    const isValid = validRequirements.length === passwordRequirements.length;
    
    if (!isValid) {
      setErrors(prev => ({
        ...prev,
        password: "Please meet all password requirements"
      }));
    } else {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
    
    return isValid;
  };

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleContinue = (e: FormEvent) => {
    e.preventDefault();
    const isEmailValid = validateEmail(user.email);
    const isPasswordValid = validatePassword(user.password);

    if (isEmailValid && isPasswordValid) {
      setSignupPage(1);
    }
  };

  const handleGoogleSignup = () => {};
  const handleDiscordSignup = () => {};

  return (
    <>
      {isMobile ? <NavMobile /> : <NavDesktop />}

      <div className="signupContainer">
        <form className="signupForm" onSubmit={handleSignup}>
          <h2>{"Sign up"}</h2>
          {signupPage === 0 && (
            <>
              <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className={`signupInput ${errors.email ? 'error' : ''}`}
                  placeholder="e.g, johndoe@example.com"
                  value={user.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                    validateEmail(e.target.value);
                  }}
                  required
                  id="email"
                />
                {errors.email && <span className="errorMessage">{errors.email}</span>}
              </div>
              <div className="inputGroup passwordGroup">
                <label aria-label='Password' htmlFor="password">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                    validatePassword(e.target.value);
                  }}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                  required
                  className={`signupInput ${errors.password ? 'error' : ''}`}
                  id="password"
                />
                <button
                  type="button"
                  className="passwordToggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className="material-icons">{showPassword ? "visibility_off" : "visibility"}</i>
                </button>
                
                <div className={`password-requirements ${focusedInput === "password" ? "show" : ""}`} style={{padding: focusedInput === 'password' ? '1em': '', margin: focusedInput === 'password' ? '1em' : ''}}>
                  <ul>
                    {passwordRequirements.map((req) => (
                      <li 
                        key={req.id}
                        className={`requirement ${validRequirements.includes(req.id) ? 'valid' : ''}`}
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
              <button className="signupButton" onClick={handleContinue}>Continue</button>
              <div className="divider"><span>Or continue with</span></div>

              <div className="socialSignup">
                <button type="button" className="googleButton" onClick={handleGoogleSignup}>
                  <FontAwesomeIcon icon={faGoogle} /> <label>Google</label>
                </button>
                <Button type="button" className="discordButton" onClick={handleDiscordSignup}>
                  <FontAwesomeIcon icon={faDiscord} /> <label>Discord</label>
                </Button>
              </div>

              <div className="formFooter">
                <a href="/login">Already have an account? Login!</a>
              </div>
            </>
          )}
          {signupPage === 1 && (
            <>
              <div className="inputGroup">
                <label htmlFor="date" aria-label="Date of birth">{'Date of birth'}</label>
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
                <label htmlFor="username" aria-label="username">{'Username'}</label>
                <input
                  type="text"
                  className="signupInput"
                  id="username"
                  required
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
              </div>
              <Button className="signupButton" type="submit">{'Sign up'}</Button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Signup;