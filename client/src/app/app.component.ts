import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GetJwtService } from './core/services/get-jwt.service';
import { SocketHandlerService } from './core/services/socket-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isShow = false;
  user!: any;
  constructor(
    private jwtService: GetJwtService,
    private router: Router,
    private http: HttpClient,
    private socketService: SocketHandlerService
  ) {}
  ngOnInit(): void {
    this.socketService.onConnection();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((_) => {
        const token = this.jwtService.getToken();
        if (token) {
          this.isShow = true;
          this.getUser();
        } else {
          this.isShow = false;
        }
      });
  }
  getUser(): void {
    this.http
      .get(environment.Server_URL + 'find-user')
      .pipe(
        map((res) => {
          return res as any;
        })
      )
      .subscribe((res) => {
        const userName1 = res.name;
        let wins1;
        let loses1;
        if (!res.wins) {
          wins1 = 0;
        } else {
          wins1 = res.wins;
        }
        if (!res.loses) {
          loses1 = 0;
        } else {
          loses1 = res.loses;
        }
        this.user = { userName: userName1, wins: wins1, loses: loses1 };
      });
  }
}
