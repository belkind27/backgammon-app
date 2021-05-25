import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class GameResultService {
  constructor(private http: HttpClient) {}
  gameWon(): void {
    this.http
      .post(environment.Server_URL + 'game-result', { isGameWon: true })
      .subscribe();
  }
  gameLost(): void {
    this.http
      .post(environment.Server_URL + 'game-result', { isGameWon: false })
      .subscribe();
  }
}
