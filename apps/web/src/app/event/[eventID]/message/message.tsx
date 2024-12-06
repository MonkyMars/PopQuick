import Image from "next/image";
import { Member, MessageType } from "../event-util";

interface MessageProps {
  message: MessageType;
  activeUser: Member | null;
}

const Message: React.FC<MessageProps> = ({ message, activeUser }) => {
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
          />
        )}
        <span className="username">{message.sender?.username}</span>
      </header>
      <p className="content">{message.content}</p>
      <footer>
        <p>{message.timeSent.slice(0, 5)}</p>
      </footer>
    </div>
  );
};

export default Message;
