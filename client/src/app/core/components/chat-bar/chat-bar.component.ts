import { Component, OnInit } from '@angular/core';
import { Dialog } from 'src/app/models/dialog.model';
import { GetChatsService } from '../../services/get-chats.service';
import { SocketHandlerService } from '../../services/socket-handler.service';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.css'],
})
export class ChatBarComponent implements OnInit {
  chats: Dialog[] = [];
  constructor(
    private getChats: GetChatsService,
    private socketService: SocketHandlerService
  ) {}

  ngOnInit(): void {
    this.getChats.chats$.subscribe((res) => {
      this.chats.push(res);
      if (this.getChats.isClientInit) {
        this.socketService.onChatCreated(res.friendId);
      }
      this.getChats.isClientInit = false;
    });
    this.socketService.receiveMessage().subscribe((res) => {
      const chat = this.chats.find((c) => c.id === res.id);
      chat?.messages.push(res.msg);
    });
    this.socketService.onChatOpened().subscribe((res) => {
      sessionStorage.setItem(res.id, res.chat);
    });
    this.socketService.timeToGetChat().subscribe((res) => {
      this.getChats.getChat(res);
    });
  }
  deleteChat(chatToDelete: Dialog): void {
    this.chats = this.chats.filter((chat) => {
      return chat.id !== chatToDelete.id;
    });
  }
  sendMessage(chat: Dialog, msgContent: string, input: any): void {
    const message = {
      content: msgContent,
      senderId: chat.myId,
      time: new Date(),
    };
    this.getChats.sendMessage(chat.id, message);
    this.socketService.sendMessage(message, chat.friendId, chat.id);
    input.value = '';
  }
}
