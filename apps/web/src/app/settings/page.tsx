"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      }, 300);
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
                  placeholder="Enter your new username"
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
                  placeholder="Your current email"
                  disabled
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
                  placeholder="Enter new email"
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
                  placeholder="Repeat new email"
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
                <input type="password" id="currentPassword" name="currentPassword" placeholder="Enter current password" />
              </div>
              <div className="inputGroup">
                <label htmlFor="newPassword">New Password</label>
                <input type="password" id="newPassword" name="newPassword" placeholder="Enter new password" />
              </div>
              <div className="inputGroup">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm new password" />
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
      <motion.div
        className={`settingsContent ${animatingOut ? 'exit' : 'active'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {content}
      </motion.div>
    );
  };

  return (
    <>
      <motion.nav
        className="Nav"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pages">
          {pages.map((page) => (
            <motion.div
              key={page.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={page.href}>
                {page.label}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="userMenuContainer">
          <motion.button
            className="userButton"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            aria-label="User menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <User className="icon" />
          </motion.button>
          <AnimatePresence>
            {isUserMenuOpen && (
              <motion.div
                className="userMenu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  className="menuItem"
                  onClick={() => (window.location.href = "/signout")}
                  whileHover={{ backgroundColor: "var(--theme-pink)" }}
                >
                  <LogOut className="menuIcon" />
                  Sign out
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      <motion.div
        className="settingsContainer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <motion.div
          className="settingsSidebar"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {settingsCategories.map((category) => (
            <motion.button
              key={category.id}
              className={`categoryButton ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategoryWithAnimation(category.id)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon}
              {category.label}
            </motion.button>
          ))}
        </motion.div>
        <motion.div
          className="settingsMainContainer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {renderSettingsContent()}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Profile;

