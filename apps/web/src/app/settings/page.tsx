"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import "@/app/settings/settings.scss";
import Image from "next/image";
import { LogOut, Settings, User, Bell, CreditCard, Lock, Shield } from 'lucide-react';
import Link from "next/link";

const Profile: React.FC = () => {
  interface Pages {
    id: number;
    label: string;
    href: string;
  }

  interface SettingsCategory {
    id: string;
    label: string;
    icon: React.ReactNode;
  }

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("account");
  const [animatingOut, setAnimatingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const pages: Pages[] = [
    { label: "Home", href: "/", id: 1 },
    { label: "Placeholder", href: "/", id: 2 },
    { label: "Placeholder", href: "/", id: 3 },
  ];

  const settingsCategories: SettingsCategory[] = [
    { id: "account", label: "Account", icon: <User className="icon" /> },
    { id: "password", label: "Password", icon: <Lock className="icon" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="icon" /> },
    { id: "billing", label: "Billing", icon: <CreditCard className="icon" /> },
    { id: "privacy", label: "Privacy", icon: <Shield className="icon" /> },
  ];

  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    currentEmail: "",
    newEmail: "",
    repeatNewEmail: "",
    website: "",
    bio: "",
  });

  const [stats] = useState({
    posts: 0,
    friends: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSave = () => {
    console.log("Profile saved:", profileData);
  };

  const setActiveCategoryWithAnimation = useCallback((category: string) => {
    if (category !== activeCategory) {
      setAnimatingOut(true);
      setTimeout(() => {
        setActiveCategory(category);
        setAnimatingOut(false);
      }, 300); // This should match the animation duration in CSS
    }
  }, [activeCategory]);

  const renderSettingsContent = () => {
    const content = (() => {
      switch (activeCategory) {
        case "account":
          return (
            <>
              <h2>Account Settings</h2>
              <div className="inputGroup">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={profileData.username}
                  onChange={handleInputChange}
                />
              </div>
              <h3>Email</h3>
              <div className="inputGroup">
                <label htmlFor="currentEmail">Current Email</label>
                <input
                  type="email"
                  id="currentEmail"
                  name="currentEmail"
                  value={profileData.currentEmail}
                  onChange={handleInputChange}
                />
              </div>
              <div className="inputGroup">
                <label htmlFor="newEmail">New Email</label>
                <input
                  type="email"
                  id="newEmail"
                  name="newEmail"
                  value={profileData.newEmail}
                  onChange={handleInputChange}
                />
              </div>
              <div className="inputGroup">
                <label htmlFor="repeatNewEmail">Repeat New Email</label>
                <input
                  type="email"
                  id="repeatNewEmail"
                  name="repeatNewEmail"
                  value={profileData.repeatNewEmail}
                  onChange={handleInputChange}
                />
              </div>
              <button className="saveButton" onClick={handleSave}>Save Changes</button>
            </>
          );
        case "password":
          return (
            <>
              <h2>Change Password</h2>
              <div className="inputGroup">
                <label htmlFor="currentPassword">Current Password</label>
                <input type="password" id="currentPassword" name="currentPassword" />
              </div>
              <div className="inputGroup">
                <label htmlFor="newPassword">New Password</label>
                <input type="password" id="newPassword" name="newPassword" />
              </div>
              <div className="inputGroup">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" />
              </div>
              <button className="saveButton">Change Password</button>
              <p className="resetLink">
                <a href="/reset-password">Forgot your password? Reset it here.</a>
              </p>
            </>
          );
        case "notifications":
          return (
            <>
              <h2>Notification Preferences</h2>
              <div className="toggleGroup">
                <label htmlFor="emailNotifications">Email Notifications</label>
                <input type="checkbox" id="emailNotifications" name="emailNotifications" />
              </div>
              <div className="toggleGroup">
                <label htmlFor="pushNotifications">Push Notifications</label>
                <input type="checkbox" id="pushNotifications" name="pushNotifications" />
              </div>
              <button className="saveButton">Save Preferences</button>
            </>
          );
        case "billing":
          return (
            <>
              <h2>Billing Information</h2>
              <p>Current Plan: Free</p>
              <button className="upgradeButton">Upgrade to Pro</button>
              <h3>Payment Methods</h3>
              <p>No payment methods added</p>
              <button className="addPaymentButton">Add Payment Method</button>
            </>
          );
        case "privacy":
          return (
            <>
              <h2>Privacy Settings</h2>
              <div className="toggleGroup">
                <label htmlFor="profileVisibility">Make Profile Public</label>
                <input type="checkbox" id="profileVisibility" name="profileVisibility" />
              </div>
              <div className="toggleGroup">
                <label htmlFor="activityVisibility">Show Activity Status</label>
                <input type="checkbox" id="activityVisibility" name="activityVisibility" />
              </div>
              <button className="saveButton">Save Privacy Settings</button>
            </>
          );
        default:
          return null;
      }
    })();

    return (
      <div 
        className={`settingsContent ${animatingOut ? 'exit' : 'active'}`}
        style={{
          animation: animatingOut 
            ? 'slideOutToTop 0.3s ease forwards'
            : 'slideInFromBottom 0.3s ease forwards'
        }}
      >
        {content}
      </div>
    );
  };

  return (
    <>
      <nav className="Nav">
        <div className="pages">
          {pages.map((page) => (
            <Link href={page.href} key={page.id}>
              {page.label}
            </Link>
          ))}
        </div>

        <div className="userMenuContainer">
          <button
            className="userButton"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            aria-label="User menu"
          >
            <User className="icon" />
          </button>
          {isUserMenuOpen && (
            <div className="userMenu">
              <button
                className="menuItem"
                onClick={() => (window.location.href = "/signout")}
              >
                <LogOut className="menuIcon" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="settingsContainer">
        <div className="settingsSidebar">
          {settingsCategories.map((category) => (
            <button
              key={category.id}
              className={`categoryButton ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategoryWithAnimation(category.id)}
            >
              {category.icon}
              {category.label}
            </button>
          ))}
        </div>
        <div className="settingsMainContainer">
          {renderSettingsContent()}
        </div>
      </div>
    </>
  );
};

export default Profile;

