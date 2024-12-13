"use client";

import { NextPage } from "next";
import { LogOut, Search, Settings, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import "./Home.scss";
import { useState, useRef, useEffect } from "react";
import PopQuickGroupCard from "@/components/GroupCard/GroupCard";
import LoadingGroupCard from "@/components/GroupCard/LoadingGroupCard";

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

interface fetchRecommendedCategoriesProps {
  top_n: number;
  temperature: number;
  model: string;
  feedback: { category: string; liked: boolean }[];
}

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("recommended");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [recommendedCategories, setRecommendedCategories] = useState<string[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const fetchRecommendedCategories = async ({
    top_n,
    temperature,
    model,
    feedback,
  }: fetchRecommendedCategoriesProps): Promise<void> => {
    try {
      setIsLoading(true);
      const formattedFeedback = feedback.map((f) => ({
        category: f.category.toLowerCase().trim(),
        liked: Boolean(f.liked),
      }));

      const encodedFeedback = encodeURIComponent(
        JSON.stringify(formattedFeedback)
      );
      // checkout https://github.com/MonkyMars/PopQuick-Category-Algorithm to see how to run and fetch results
      const response = await fetch(
        `http://localhost:5000/api/categories?temperature=${temperature}&top_n=${top_n}&model=${model}&feedback=${encodedFeedback}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data.data)) {
        setRecommendedCategories(data.data);
      } else {
        console.error("Invalid data format received");
        setRecommendedCategories([]);
      }
    } catch (error) {
      console.error("Error fetching recommended categories:", error);
      setRecommendedCategories([]);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const initializeFetch = async () => {
      const feedback: { category: string; liked: boolean }[] = [
        { category: "blockchain", liked: true },
        { category: "cryptocurrency", liked: true },
        { category: "nfts", liked: true },
        { category: "decentralized finance", liked: true },
        { category: "smart contracts", liked: true },
        { category: "tokenization", liked: true },
        { category: "digital art", liked: true },
        { category: "crypto wallets", liked: true },
        { category: "blockchain technology", liked: true },
        { category: "web3", liked: true },
        { category: "metaverse", liked: true },
        { category: "crypto trading", liked: true },
        { category: "blockchain platforms", liked: true },
      ];
      const props: {
        top_n: number;
        temperature: number;
        model: string;
        feedback: { category: string; liked: boolean }[];
      } = {
        top_n: 20,
        temperature: 1,
        model: "popai",
        feedback: feedback,
      };

      await fetchRecommendedCategories(props);
    };

    initializeFetch();
  }, []);

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
      category: "environmentalism",
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

  const categoryOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "location", label: "Location Based" },
    { value: "interests", label: "Interest Based" },
  ];

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
        <div className={`search ${isSearchFocused ? "focused" : ""}`}>
          <Search className={`icon ${isSearchFocused ? "active" : ""}`} />
          <input
            type="text"
            placeholder="Search groups..."
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
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
      <div className="mainContent">
        <div className="categorySelect" ref={dropdownRef}>
          <button
            className={`dropdownTrigger ${isDropdownOpen ? "active" : ""}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-expanded={isDropdownOpen}
          >
            <span>
              {
                categoryOptions.find(
                  (option) => option.value === selectedCategory
                )?.label
              }
            </span>
            <ChevronDown className="icon" />
          </button>
          {isDropdownOpen && (
            <div className="dropdownMenu">
              {categoryOptions.map((option) => (
                <button
                  key={option.value}
                  className={`dropdownItem ${selectedCategory === option.value ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedCategory(option.value);
                    setIsDropdownOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {selectedCategory === "recommended" && (
          <>
            <h2>Recommended Groups for You</h2>
            <div className="groupGrid">
              {isLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <LoadingGroupCard key={index} />
                ))
              ) : filteredGroups.length > 0 ? (
                filteredGroups.map((group, index) => (
                  <PopQuickGroupCard
                    key={index}
                    name={recommendedCategories[index] || group.name}
                    imageUrl={group.image}
                    description={group.description}
                    category={group.category}
                    memberCount={4}
                    maxMemberSize={4}
                  />
                ))
              ) : (
                <h2>No groups found</h2>
              )}
            </div>
          </>
        )}
        {selectedCategory === "location" && (
          <>
            <h2>Nearby Groups for You</h2>
            <div className="groupGrid">
              {filteredGroups.length > 0 ? (
                filteredGroups.map((group, index) => (
                  <PopQuickGroupCard
                    key={index}
                    name={group.name}
                    imageUrl={group.image}
                    description={group.description}
                    category={group.category}
                    memberCount={4}
                    maxMemberSize={4}
                  />
                ))
              ) : (
                <h2>No groups found</h2>
              )}
            </div>
          </>
        )}
        {selectedCategory === "interests" && (
          <>
            <h2>Interesting Groups for You</h2>
            <div className="groupGrid">
              {filteredGroups.length > 0 ? (
                filteredGroups.map((group, index) => (
                  <PopQuickGroupCard
                    key={index}
                    name={group.name}
                    imageUrl={group.image}
                    description={group.description}
                    category={group.category}
                    memberCount={4}
                    maxMemberSize={4}
                  />
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
