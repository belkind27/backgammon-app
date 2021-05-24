import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class GetFriendsService {
  constructor(private http: HttpClient) {}
  getUsers(): Observable<any> {
    return this.http
      .get(environment.Server_URL + '')
      .pipe(map((res) => res as any));
  }
  addFriend(id: string): Observable<any> {
    return this.http
      .post(environment.Server_URL + '', { userId: id })
      .pipe(map((res) => res as any));
  }
}
