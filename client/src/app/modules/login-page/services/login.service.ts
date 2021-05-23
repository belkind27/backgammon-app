import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}
  login(name: string, password: string): Observable<any> {
    return this.http
      .post(environment.Server_URL + 'Login', {
        userName: name,
        userPassword: password,
      })
      .pipe(map((res) => res as any));
  }
}
