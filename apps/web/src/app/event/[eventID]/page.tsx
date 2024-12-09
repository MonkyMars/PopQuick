"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  User,
  Settings,
  LogOut,
  Menu,
  CalendarDays,
  Clock,
} from "lucide-react";
import Link from "next/link";
import "../event.scss";
import { NextPage } from "next";
import Message from "./message/message";
import InputField from "./inputField/inputField";
import { Member, MessageType, Event } from "./event-util";
import { fetchEvent } from "./fetching/event-fetching";

const EventPage: NextPage = () => {
  const params = useParams() as { eventID: string };
  const [timeRemaining, setTimeRemaining] = useState<number>(600);
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
  const staticMessages: MessageType[] = [
    {
      id: 1,
      content: "Hey everyone, excited for the event!",
      date: "2022-01-01",
      sender: staticMembers[0],
      timeSent: new Date().toTimeString(),
    },
    {
      id: 2,
      content: "Looking forward to meeting you all.",
      date: "2022-01-02",
      sender: staticMembers[1],
      timeSent: new Date().toTimeString().toString(),
    },
    {
      id: 3,
      content: "Don't forget to bring your tickets.",
      date: "2022-01-03",
      sender: staticMembers[2],
      timeSent: new Date().toTimeString().toString(),
    },
    {
      id: 4,
      content: "See you all there!",
      date: "2022-01-04",
      sender: staticMembers[3],
      timeSent: new Date().toTimeString().toString(),
    },
    {
      id: 5,
      content: "Hey everyone, excited for the event!",
      date: "2022-01-01",
      sender: staticMembers[0],
      timeSent: new Date().toTimeString().toString(),
    },
    {
      id: 6,
      content: "Looking forward to meeting you all.",
      date: "2022-01-02",
      sender: staticMembers[1],
      timeSent: new Date().toTimeString().toString(),
    },
    {
      id: 7,
      content: "Don't forget to bring your tickets.",
      date: "2022-01-03",
      sender: staticMembers[2],
      timeSent: new Date().toTimeString().toString(),
    },
    {
      id: 8,
      content: "See you all there!",
      date: "2022-01-04",
      sender: staticMembers[3],
      timeSent: new Date().toTimeString().toString(),
    },
    {
      id: 9,
      content: "Looking forward to meeting you all.",
      date: "2022-01-02",
      sender: staticMembers[1],
      timeSent: new Date().toTimeString().toString(),
    },
    {
      id: 10,
      content: "Don't forget to bring your tickets.",
      date: "2022-01-03",
      sender: staticMembers[2],
      timeSent: new Date().toTimeString().toString(),
    },
    {
      id:11,
      content: "See you all there!",
      date: "2022-01-04",
      sender: staticMembers[3],
      timeSent: new Date().toTimeString().toString(),
    },
  ];

  const calculateTimeRemaining = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const staticEvent: Event = {
    id: eventID,
    name: `Event ${eventID}`,
    date: new Date().toString(),
    timeRemaining: calculateTimeRemaining(timeRemaining),
    members: staticMembers,
    messages: staticMessages,
  } as Event;

  useEffect(() => {
    const fetchEventData = async () => {
      const fetchedEvent = await fetchEvent({ eventID });
      if (fetchedEvent.status === 200) {
        try {
          setEvent(fetchedEvent.data);
        } catch (error) {
          console.error("Error setting event data:", error);
          setEvent(staticEvent);
        }
      } else {
        setEvent(staticEvent);
      }
    };
    fetchEventData();
  }, [eventID]);

  const pages = [
    { label: "Home", href: "/", id: 1 },
    { label: "Placeholder", href: "/", id: 2 },
    { label: "Placeholder", href: "/", id: 3 },
  ];
  
  const [activeUser] = useState<Member | null>(staticMembers[0]);
  const members = event?.members.map((member) => member.username).join(", ");
  const formattedDate = new Date(String(event?.date)).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

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
            <aside className={`aside ${isMemberMenuOpen ? "AsideOpen" : ""}`}>
              <header>
                <h1>{event.name}</h1>
                <span className="timer">
                  <Clock className="icon" />
                  {calculateTimeRemaining(timeRemaining)}
                </span>
              </header>
              {staticMembers.map((member) => (
                <div
                  key={member.id}
                  className={`member ${member.id === activeUser?.id ? "you" : ""}`}
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
                      ? `${member.username} (You)`
                      : member.username}
                  </span>
                </div>
              ))}
              <section className="details">
                <h2>Event Details</h2>
                <div className="detail">
                  <CalendarDays className="icon" />
                  <span className="text">{formattedDate}</span>
                </div>
                <div className="detail">
                  <User className="icon" />
                  <span className="text">{members}</span>
                </div>
              </section>
            </aside>
            <section className="messagesTab">
              <div className="messagesContainer">
                {staticMessages.map((message) => (
                  <Message message={message} activeUser={activeUser} />
                ))}
                <InputField messageInput={messageInput} setMessageInput={setMessageInput}/>
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
