import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/modules/login-page/components/login-main/login-main.component';
import { environment } from 'src/environments/environment';
import { FriendsInList } from '../components/friends-bar/friends-bar.component';

@Injectable({
  providedIn: 'root',
})
export class FriendsListService {
  constructor(private http: HttpClient) {}
  friendsList$: Subject<FriendsInList[]> = new Subject();
  getFriends(): void {
    this.http
      .get(environment.Server_URL + 'find-friends')
      .pipe(map((res) => res as any[]))
      .subscribe((res) => {
        this.friendsList$.next(
          res?.map((friend) => {
            return { id: friend._id, name: friend.name, isConnected: false };
          })
        );
      });
  }
  removeFriends(id: string): void {
    this.http
      .delete(environment.Server_URL + 'delete-friend', {
        params: new HttpParams().set('id', id),
      })
      .subscribe((_) => {
        setTimeout(() => {
          this.getFriends();
        }, 1000); // wait a second
      });
  }
  addFriends(id: string): Observable<any> {
    return this.http.post(environment.Server_URL + 'add-friend', {
      userId: id,
    });
  }
  getUsers(): Observable<any> {
    return this.http
      .get(environment.Server_URL + 'find-all-users')
      .pipe(map((res) => res as any));
  }
}
