"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { User, Settings, LogOut, Plus, Send, Menu, CalendarDays, Info, Clock  } from "lucide-react";
import Link from "next/link";
import "../event.scss";

interface Event {
  id: string;
  name: string;
  date: string;
  description: string;
  timeRemaining: string;
  members: Member[];
  messages: Message[];
}

interface Member {
  id: number;
  username: string;
  profilePicture: string;
  status?: 'online' | 'offline';
}

interface Message {
  id: number;
  content: string;
  date: string;
  sender?: Member;
}
const EventPage = () => {
  const params = useParams() as { eventID: string };
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = useState<{raw: number, formatted: string}>({
    raw: 600,
    formatted: '10:00'
  });
  const eventID = params.eventID as string;
  const [event, setEvent] = useState<Event | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [isMemberMenuOpen, setIsMemberMenuOpen] = useState<boolean>(false);
  const [messageInput, setMessageInput] = useState<string>("");
  
  const staticMembers: Member[] = [
    {
      id: 1,
      username: "Monky",
      profilePicture:
        "https://upload.wikimedia.org/wikipedia/commons/7/78/Image.jpg",
    },
    {
      id: 2,
      username: "Longdy",
      profilePicture:
        "https://upload.wikimedia.org/wikipedia/commons/7/78/Image.jpg",
    },
    {
      id: 3,
      username: "NerdBlud",
      profilePicture:
        "https://upload.wikimedia.org/wikipedia/commons/7/78/Image.jpg",
    },
    {
      id: 4,
      username: "Epicness",
      profilePicture:
        "https://upload.wikimedia.org/wikipedia/commons/7/78/Image.jpg",
    },
  ];
  const staticMessages: Message[] = [
    {
      id: 1,
      content: "Hey everyone, excited for the event!",
      date: "2022-01-01",
      sender: staticMembers[0],
    },
    {
      id: 2,
      content: "Looking forward to meeting you all.",
      date: "2022-01-02",
      sender: staticMembers[1],
    },
    {
      id: 3,
      content: "Don't forget to bring your tickets.",
      date: "2022-01-03",
      sender: staticMembers[2],
    },
    {
      id: 4,
      content: "See you all there!",
      date: "2022-01-04",
      sender: staticMembers[3],
    },
    {
      id: 5,
      content: "Hey everyone, excited for the event!",
      date: "2022-01-01",
      sender: staticMembers[0],
    },
    {
      id: 6,
      content: "Looking forward to meeting you all.",
      date: "2022-01-02",
      sender: staticMembers[1],
    },
    {
      id: 7,
      content: "Don't forget to bring your tickets.",
      date: "2022-01-03",
      sender: staticMembers[2],
    },
    {
      id: 8,
      content: "See you all there!",
      date: "2022-01-04",
      sender: staticMembers[3],
    },
  ];

  const calculateTimeRemaining = (timeRemaining: number): string => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining.raw > 0) {
        setTimeRemaining((prevTime) => ({
          raw: prevTime.raw - 1,
          formatted: calculateTimeRemaining(prevTime.raw - 1)
        }));
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval)
  }, [timeRemaining])

  const staticEvent: Event = {
    id: eventID,
    name: `Event ${eventID}`,
    date: new Date().toDateString(),
    description: "Description 1",
    timeRemaining: calculateTimeRemaining(600),
    members: staticMembers,
    messages: staticMessages,
  } as Event;

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventID) {
        router.push("/");
        return;
      }
      try {
        const response = await fetch(`/api/events/${eventID}`);
        if (!response.ok) {
          // router.push("/"); // Redirect to home page if event not found
          throw new Error("Failed to fetch event data");
        }
        const eventData: Event = await response.json();
        setEvent(eventData); // need to set event data based on response one by one
      } catch (error) {
        console.error("Error fetching event data:", error);
        setEvent(staticEvent);
      }
    };
    fetchEvent();
  }, [eventID]);

  const pages = [
    { label: "Home", href: "/", id: 1 },
    { label: "Placeholder", href: "/", id: 2 },
    { label: "Placeholder", href: "/", id: 3 },
  ];
  const [activeUser] = useState<Member | null>(staticMembers[0]);
  const members = event?.members.map(member => member.username).join(', ');
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
      <main className="mainContent">
        {event && (
          <>
            <aside className={`aside ${isMemberMenuOpen ? "AsideOpen" : null}`}>
              <header>
                <h1>{event.name}</h1>
              </header>
              {staticMembers.map((member) => (
                <div
                  key={member.id}
                  className={`member ${member.id === activeUser?.id ? "you" : null}`}
                >
                  <Image
                    src={member.profilePicture}
                    alt={member.username}
                    width={50}
                    height={50}
                    className="avatar"
                    draggable={false}
                  />
                  <span className="username">
                    {member.username === activeUser?.username
                      ? member.username + " (You)"
                      : member.username}
                  </span>
                </div>
              ))}
                <section className="details">
                <h2>Event Details</h2>
                <div className="detail">
                  <CalendarDays className="icon" />
                  <span className="text">{event.date}</span>
                </div>
                <div className="detail">
                  <User className="icon" />
                  <span className="text">{
                    members
                    }</span>
                </div>
                <div className="detail">
                  <Info className="icon" />
                  <span className="text">{event.description}</span>
                </div>
                </section>
            </aside>
            <section className="messagesTab">
                <h2>Messages</h2>
              <div className="messagesContainer">
                <span className="timer"><Clock className="icon"/>{timeRemaining.formatted}</span>
                {staticMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.sender?.id == activeUser?.id ? "sent" : "received"}`}
                  >
                    <header>
                      {message.sender?.profilePicture && (
                        <Image
                          src={message.sender?.profilePicture}
                          alt="User"
                          width={50}
                          height={50}
                          className="avatar"
                          draggable={false}
                        />
                      )}
                      <span>{message.sender?.username}</span>
                    </header>
                    <p className="content">{message.content}</p>
                    <footer>
                      <p>{message.date}</p>
                    </footer>
                  </div>
                ))}
                <div className="inputContainer">
                  <button>
                    <Plus className="icon add" />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="input"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                  <button type="submit" disabled={!messageInput}>
                    <Send
                      className={`icon send ${messageInput ? "valid" : "invalid"}`}
                    ></Send>
                  </button>
                </div>
              </div>
            </section>
            <Menu
              className={`menu ${isMemberMenuOpen ? "open" : ""}`}
              onClick={() => setIsMemberMenuOpen(!isMemberMenuOpen)}
            />
          </>
        )}
      </main>
    </>
  );
};

export default EventPage;
