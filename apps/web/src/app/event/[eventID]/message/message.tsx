import Image from "next/image";
import { Member, MessageType } from "../event-util";
import React from "react";

interface MessageProps {
  message: MessageType;
  activeUser: Member | null;
  onClick: () => void;
}

const Message: React.FC<MessageProps> = ({ message, activeUser, onClick }) => {
  return (
    <div
      key={message.id}
      className={`message ${message.sender?.id === activeUser?.id ? "sent" : "received"}`}
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
            onClick={onClick}
          />
        )}
        <span className="username" onClick={() => onClick()}>{message.sender?.username}</span>
      </header>
      <p className="content">{message.content}</p>
      <footer>
        <p>{message.timeSent.slice(0, 5)}</p>
      </footer>
    </div>
  );
};

export default Message;
