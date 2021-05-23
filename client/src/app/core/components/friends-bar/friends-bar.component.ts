import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { GetJwtService } from '../../services/get-jwt.service';

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
  isShow = false;
  friends = [
    { name: 'friend 1', isConnected: true },
    { name: 'friend 2', isConnected: true },
    { name: 'friend 3', isConnected: false },
    { name: 'friend 4', isConnected: false },
    { name: 'friend 5', isConnected: true },
    { name: 'friend 6', isConnected: false },
    { name: 'friend 7', isConnected: true },
    { name: 'friend 8', isConnected: false },
    { name: 'friend 9', isConnected: true },
    { name: 'friend 10', isConnected: false },
    { name: 'friend 11', isConnected: true },
    { name: 'friend 12', isConnected: false },
    { name: 'friend 13', isConnected: true },
    { name: 'friend 14', isConnected: false },
    { name: 'friend 15', isConnected: true },
    { name: 'friend 16', isConnected: false },
    { name: 'friend 17', isConnected: true },
  ];
  constructor(private jwtService: GetJwtService) {}

  ngOnInit(): void {
    const token = this.jwtService.getToken();
    if (token) {
      this.isShow = true;
    }
    this.isShow = false;
  }
  btnClick(): void {
    this.isShown ? (this.isShown = false) : (this.isShown = true);
  }
  unfriend(friend: any): void {}
  playWithFriend(friend: any): void {}
  openChat(friend: any): void {}
}
