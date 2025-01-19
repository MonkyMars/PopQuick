export interface Event {
  id: string;
  name: string;
  date: string;
  timeRemaining: string;
  members: Member[];
  messages: MessageType[];
}

export interface Member {
  id: number;
  username: string;
  profilePicture: string;
  status?: "online" | "offline";
  bio?: string;
  owner?: boolean;
  memberSince?: string;
}

export interface MessageType {
  id: number;
  content: string;
  date: string;
  timeSent: string;
  sender?: Member;
}
