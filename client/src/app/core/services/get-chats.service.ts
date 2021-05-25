import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dialog } from 'src/app/models/dialog.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetChatsService {
  constructor(private http: HttpClient) {}
  chats$: Subject<Dialog> = new Subject();
  getChat(id: string): void {
    this.http
      .get(environment.Server_URL + 'dialog')
      .pipe(map((res) => res as Dialog))
      .subscribe((res) => {
        this.chats$.next(res);
      });
  }
  sendMessage(id: string, massage: any): void {
    this.http.post('', massage).subscribe();
  }
}
