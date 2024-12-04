export interface Event {
  id: string;
  name: string;
  date: string;
  description: string;
  timeRemaining: string;
  members: Member[];
  messages: MessageType[];
}

export interface Member {
  id: number;
  username: string;
  profilePicture: string;
  status?: "online" | "offline";
}

export interface MessageType {
  id: number;
  content: string;
  date: string;
  timeSent: string;
  sender?: Member;
}
