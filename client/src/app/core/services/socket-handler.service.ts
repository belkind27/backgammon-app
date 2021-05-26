import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Color, Player } from 'src/app/modules/game-page/models';
import { GetJwtService } from './get-jwt.service';

@Injectable({ providedIn: 'root' })
export class SocketHandlerService {
  constructor(
    private socket: Socket,
    private router: Router,
    private idService: GetJwtService
  ) {}
  playRandom(): void {
    this.socket.on(`random`, (roomName: string, color: Color) => {
      sessionStorage.setItem(
        'game-config',
        JSON.stringify({ room: roomName, yourColor: color })
      );
      this.router.navigateByUrl('Game');
    });
    this.socket.emit('playWithRandom');
  }
  sendTurn(board: Player[][], jail: Player[]): void {
    const config = sessionStorage.getItem('game-config');
    if (config) {
      const room = JSON.parse(config).room;
      this.socket.emit('turnPlayed', room, {
        gameBoard: board,
        gameJail: jail,
      });
    }
  }
  getTurn(): Observable<any> {
    return this.socket.fromEvent('next').pipe(map((res) => res as any));
  }
  gameEnded(): void {
    const config = sessionStorage.getItem('game-config');
    if (config) {
      const room = JSON.parse(config).room;
      this.socket.emit('gameEnded', room);
    }
    sessionStorage.removeItem('game-config');
    this.router.navigateByUrl('Home');
  }
  login(id: string): void {
    this.socket.emit('login', id);
  }
  getConnectedUsersIds(): Observable<string[]> {
    return this.socket.fromEvent('userConnected');
  }
  openChat(id: string): void {
    this.socket.emit('openChatRoom', id);
  }
  sendMessage(message: any, key: string, chatId: string): void {
    const room = sessionStorage.getItem(key);
    if (room) {
      this.socket.emit('message', room, message, chatId);
    }
  }
  receiveMessage(): Observable<any> {
    return this.socket
      .fromEvent('messageReceived')
      .pipe(map((res) => res as any));
  }
  onChatOpened(): Observable<any> {
    return this.socket.fromEvent(`chatRoom`).pipe(map((res) => res as any));
  }
  playWithFriend(oppId: string): void {
    this.socket.emit('playWithFriend', oppId);
  }
  onInvite(): Observable<string> {
    this.socket.on(`play`, (roomName: string, color: Color) => {
      sessionStorage.setItem(
        'game-config',
        JSON.stringify({ room: roomName, yourColor: color })
      );
      this.router.navigateByUrl('Game');
    });
    return this.socket.fromEvent('inviteReceived').pipe(
      map((res) => {
        return res as string;
      })
    );
  }
  acceptInvite(id: string): void {
    this.socket.emit('acceptInvite', id);
  }
  onConnection(): void {
    this.socket.on('connect', () => {
      const id = this.idService.getId();
      if (id) {
        this.login(id);
      }
    });
  }
}
