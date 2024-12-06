"use client";
import React, { useState, useRef, useEffect } from "react";
import "@/app/profile/profile.scss";
import Image from "next/image";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

const Profile: React.FC = () => {
  interface Pages {
    id: number;
    label: string;
    href: string;
  }

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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

  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
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
            <div className="userMenu" ref={dropdownRef}>
              <button className="menuItem">
                <Settings className="menuIcon" />
                Settings
              </button>
              <button className="menuItem">
                <LogOut className="menuIcon" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="profileContainer">
        <div className="profile">
          <div className="stats">
            <div className="stat">
              <div className="number">{stats.posts}</div>
              <div className="label">Groups</div>
            </div>
            <div className="stat">
              <div className="number">{stats.friends}</div>
              <div className="label">Friends</div>
            </div>
          </div>

          <div className="userInformation">
            <div className="header">
              <div className="title">Edit Profile</div>
              <button className="done-btn" onClick={handleSave}>
                Done
              </button>
            </div>

            <div className="icon">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Image.jpg"
                alt="Profile"
                width={100}
                height={100}
                draggable={false}
              />
              <button className="change-photo" onClick={handlePhotoChange}>
                Change profile photo
              </button>
              <input
                type="file"
                ref={fileInputRef}
                hidden
                accept="image/*"
                onChange={(e) =>
                  console.log(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>

            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
            </div>

            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                placeholder="Username"
              />
            </div>

            <div className="input-group">
              <label htmlFor="website">Website</label>
              <input
                type="url"
                id="website"
                name="website"
                value={profileData.website}
                onChange={handleInputChange}
                placeholder="Website"
              />
            </div>

            <div className="input-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                placeholder="Bio"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
