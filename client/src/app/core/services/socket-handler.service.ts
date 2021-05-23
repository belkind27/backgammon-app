import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Color, Player } from 'src/app/modules/game-page/models';

@Injectable({ providedIn: 'root' })
export class SocketHandlerService {
  constructor(private socket: Socket, private router: Router) {}
  playRandom(): void {
    this.socket.on(
      `${this.socket.ioSocket.id}-random`,
      (roomName: string, color: Color) => {
        sessionStorage.setItem(
          'game-config',
          JSON.stringify({ room: roomName, yourColor: color })
        );
        this.router.navigateByUrl('Game');
      }
    );
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
}
