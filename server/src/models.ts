export class Dialog {
  id!: string;
  friendName!: string;
  myId!: string;
  friendId!: string;
  show!: boolean;
  messages!: [{ content: string; time: Date; senderId: string }];
}
export class User {
  id!: string;
  name!: string;
  password!: string;
  friendsIdList!: string[];
  wins!: number;
  loses!: number;
  constructor() {}
}


export interface SocketUser {
  socketId: string;
  userId: string;
}

export enum Event {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  MESSAGE = "message",
  LOGIN = "login",
  USER_CONNECTED = "userConnected",
  OPEN_CHAT_ROOM = "openChatRoom",
  TURN_PLAYED = "turnPlayed",
  PLAY_WITH_FRIEND = "playWithFriend",
  PLAY_WITH_RANDOM = "playWithRandom",
  GAME_ENDED = "gameEnded",
  MESSAGE_RECEIVED = "messageReceived",
  INVITE_RECEIVED ="inviteReceived",
  ACCEPT_INVITE = "acceptInvite"
}
