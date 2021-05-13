import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css'],
})
export class ChatBarComponent implements OnInit {
  chats = [
    {
      show: false,
      friend: { name: 'friend 1', id: 1 },
      messages: [
        { senderId: 1, content: 'hello world' },
        { senderId: 1, content: 'hello world' },
        { senderId: 2, content: 'hello world' },
        { senderId: 1, content: 'hello world' },
        { senderId: 2, content: 'hello world sssssssss' },
        { senderId: 1, content: 'hello worlddddd dsdsf rergsh' },
        { senderId: 2, content: 'hello world' },
        { senderId: 2, content: 'hello world sdgaersgearg segwsezgderggfffs' },
        { senderId: 1, content: 'hello world' },
        { senderId: 1, content: 'hello world' },
        { senderId: 2, content: 'hello world' },
        { senderId: 1, content: 'hello world' },
        { senderId: 2, content: 'hello world sssssssss' },
        { senderId: 1, content: 'hello worlddddd dsdsf rergsh' },
        { senderId: 2, content: 'hello world' },
        { senderId: 2, content: 'hello world sdgaersgearg segwsezgderggfffs' },
      ],
    },
    {
      show: false,
      friend: { name: 'friend 2', id: 2 },
      messages: [
        { senderId: 1, content: 'hello world' },
        { senderId: 1, content: 'hello world' },
        { senderId: 2, content: 'hello world' },
        { senderId: 1, content: 'hello world' },
        { senderId: 2, content: 'hello world sssssssss' },
        { senderId: 1, content: 'hello worlddddd dsdsf rergsh' },
        { senderId: 2, content: 'hello world' },
        { senderId: 2, content: 'hello world sdgaersgearg segwsezgderggfffs' },
      ],
    },
  ];
  constructor() {}

  ngOnInit(): void {}
  deleteChat(chatToDelete: any): void {
    const deleteId = chatToDelete.friend.id as number;
    this.chats = this.chats.filter((chat) => {
      return chat.friend.id !== deleteId;
    });
  }
}
