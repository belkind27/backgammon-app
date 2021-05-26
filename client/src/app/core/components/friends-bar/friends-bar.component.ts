import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FriendsListService } from '../../services/friends-list.service';
import { GetChatsService } from '../../services/get-chats.service';
import { SocketHandlerService } from '../../services/socket-handler.service';

@Component({
  selector: 'app-friends-bar',
  templateUrl: './friends-bar.component.html',
  styleUrls: ['./friends-bar.component.css'],
  animations: [
    trigger('openCloseMenu', [
      state(
        'open',
        style({
          left: '0px',
        })
      ),
      state(
        'closed',
        style({
          left: '-250px',
        })
      ),
      transition('open => closed', [animate('0.5s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
    trigger('openCloseBtn', [
      state(
        'open',
        style({
          left: '250px',
        })
      ),
      state(
        'closed',
        style({
          left: '0px',
        })
      ),
      transition('open => closed', [animate('0.5s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
})
export class FriendsBarComponent implements OnInit {
  isShown!: boolean;
  friends: FriendsInList[] = [];
  connectedUsers!: string[];
  constructor(
    private getChats: GetChatsService,
    private socketService: SocketHandlerService,
    private friendsService: FriendsListService
  ) {}

  ngOnInit(): void {
    this.socketService.onInvite().subscribe((res) => {
      const name = this.friends.find((f) => f.id === res)?.name;
      const ans = confirm(`${name} Wants To Play`);
      if (ans) {
        this.socketService.acceptInvite(res);
      }
    });
    this.friendsService.friendsList$.subscribe((res) => {
      if (res) {
        console.log(res);
        this.friends = res;
        this.friends.forEach((friend) => {
          let connected = false;
          this.connectedUsers?.forEach((id) => {
            if (id === friend.id) {
              connected = true;
            }
          });
          friend.isConnected = connected;
        });
      }
    });
    this.friendsService.getFriends();
    this.socketService.getConnectedUsersIds().subscribe((res) => {
      console.log(res);
      this.connectedUsers = res;
      this.friends.forEach((friend) => {
        let connected = false;
        res.forEach((id) => {
          if (id === friend.id) {
            connected = true;
          }
        });
        friend.isConnected = connected;
      });
    });
  }
  btnClick(): void {
    this.isShown ? (this.isShown = false) : (this.isShown = true);
  }
  unfriend(friend: FriendsInList): void {
    this.friendsService.removeFriends(friend.id);
  }
  playWithFriend(friend: FriendsInList): void {
    this.socketService.playWithFriend(friend.id);
  }
  openChat(friend: FriendsInList): void {
    this.socketService.openChat(friend.id);
  }
}
export interface FriendsInList {
  id: string;
  name: string;
  isConnected: boolean;
}
