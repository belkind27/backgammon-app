export interface User {
  id: number;
  name: string;
  friends: User[];
  password: string;
}

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  date: Date;
}

export enum Event {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  MESSAGE = "message",
  LOGIN = "login",
  TURN_PLAYED = "turnPlayed",
  PLAY_WITH_FRIEND = "playWithFriend",
  PLAY_WITH_RANDOM = "playWithRandom",
}
