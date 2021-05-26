export class Dialog {
  _id!: string;
  friendName!: string;
  myId!: string;
  friendId!: string;
  show!: boolean;
  messages!: [{ content: string; time: Date; senderId: string }];
}
