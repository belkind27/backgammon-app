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
