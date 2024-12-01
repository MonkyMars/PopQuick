"use client";

import { NextPage } from "next";
import Image from "next/image";
import { Search, User } from "lucide-react";
import Link from "next/link";
import "./Home.scss";
import { useState } from "react";

interface Pages {
  id: number;
  label: string;
  href: string;
}

interface Groups {
  name: string;
  image: string;
  description: string;
  category: string;
}

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedGroups, setSelectedGroups] = useState<
    "recommended" | "location" | "interests"
  >("recommended");
  const pages: Pages[] = [
    { label: "Home", href: "/", id: 1 },
    { label: "Placeholder", href: "/", id: 2 },
    { label: "Placeholder", href: "/", id: 3 },
  ];

  const groups: Groups[] = [
    {
      name: "Tech Innovators",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Image.jpg",
      description:
        "A community for tech enthusiasts to share ideas, projects, and innovations.",
      category: "Technology",
    },
    {
      name: "Fitness Warriors",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Image.jpg",
      description:
        "Join our group to stay motivated on your fitness journey with tips and challenges.",
      category: "Health & Wellness",
    },
    {
      name: "Art Explorers",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Image.jpg",
      description:
        "A vibrant community for artists to share their work, gain feedback, and inspire each other.",
      category: "Art",
    },
    {
      name: "Bookworms United",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Image.jpg",
      description:
        "A group for book lovers to discuss their favorite reads and discover new ones.",
      category: "Literature",
    },
    {
      name: "Adventure Seekers",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Image.jpg",
      description:
        "A community for outdoor enthusiasts and travel lovers to share adventures and plan trips.",
      category: "Travel & Adventure",
    },
    {
      name: "Music Makers",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Image.jpg",
      description:
        "Connect with fellow musicians and music lovers to collaborate and share your passion.",
      category: "Music",
    },
    {
      name: "Eco Warriors",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Image.jpg",
      description:
        "A group dedicated to promoting sustainable living and environmental awareness.",
      category: "Environment",
    },
    {
      name: "Foodies Haven",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Image.jpg",
      description:
        "A place for food enthusiasts to share recipes, reviews, and culinary experiences.",
      category: "Food & Drink",
    },
    {
      name: "Gamers Hub",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Image.jpg",
      description:
        "Join the ultimate gaming community to discuss the latest games, strategies, and news.",
      category: "Gaming",
    },
    {
      name: "Mindful Living",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Image.jpg",
      description:
        "A supportive group focusing on mindfulness, meditation, and mental well-being.",
      category: "Health & Wellness",
    },
  ];

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <nav className="Nav">
        <Image
          src={"/PopQuick.png"}
          alt="PopQuick"
          className="logo"
          width={60}
          height={60}
          priority
          draggable={false}
        />
        <div className="search">
          <Search className="icon" />
          <input
            type="text"
            placeholder="Search groups..."
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </div>
        <div className="pages">
          {pages.map((page) => (
            <Link href={page.href} key={page.id}>
              {page.label}
            </Link>
          ))}
        </div>
        <User className="icon" />
      </nav>
      <div className="mainContent">
        <div className="buttonContainer">
        <button onClick={() => setSelectedGroups("recommended")} className={selectedGroups === 'recommended' ? 'selected' : ''}>
            Recommended groups
          </button>
          <button onClick={() => setSelectedGroups("location")} className={selectedGroups === 'location' ? 'selected' : ''}>
            Location based groups
          </button>
          <button onClick={() => setSelectedGroups("interests")} className={selectedGroups === 'interests' ? 'selected' : ''}>
            Interest based groups
          </button>
        </div>
        {selectedGroups === "recommended" && (
          <>
            <h2>Recommended Groups for You</h2>
            <div className="groupGrid">
              {filteredGroups.length > 0 ? (
                filteredGroups.map((group, index) => (
                  <div className="groupCard" key={index}>
                    <Image
                      src={group.image}
                      alt={group.name}
                      width={300}
                      height={300}
                    />
                    <span>Participants: 1/4</span>
                    <h3>{group.name}</h3>
                    <p>{group.description}</p>
                    <label>{group.category}</label>
                    <button>Join</button>
                  </div>
                ))
              ) : (
                <h2>No groups found</h2>
              )}
            </div>{" "}
          </>
        )}
        {selectedGroups === "interests" && (
          <>
            <h2>Interesting Groups for You</h2>
            <div className="groupGrid">
              {filteredGroups.length > 0 ? (
                filteredGroups.map((group, index) => (
                  <div className="groupCard" key={index}>
                    <Image
                      src={group.image}
                      alt={group.name}
                      width={300}
                      height={300}
                    />
                    <span>Participants: 1/4</span>
                    <h3>{group.name}</h3>
                    <p>{group.description}</p>
                    <label>{group.category}</label>
                    <button>Join</button>
                  </div>
                ))
              ) : (
                <h2>No groups found</h2>
              )}
            </div>
          </>
        )}
        {selectedGroups === "location" && (
          <>
            <h2>Nearby Groups for You</h2>
            <div className="groupGrid">
              {filteredGroups.length > 0 ? (
                filteredGroups.map((group, index) => (
                  <div className="groupCard" key={index}>
                    <Image
                      src={group.image}
                      alt={group.name}
                      width={300}
                      height={300}
                    />
                    <span>Participants: 1/4</span>
                    <h3>{group.name}</h3>
                    <p>{group.description}</p>
                    <label>{group.category}</label>
                    <button>Join</button>
                  </div>
                ))
              ) : (
                <h2>No groups found</h2>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
