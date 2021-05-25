export class Dialog {
  id!: string;
  friendName!: string;
  myId!: string;
  friendId!: string;
  show!: boolean;
  messages!: [{ content: string; time: Date; senderId: string }];
}
