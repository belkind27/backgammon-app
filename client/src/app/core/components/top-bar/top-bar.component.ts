import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GetJwtService } from '../../services/get-jwt.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  constructor(private http: HttpClient, private jwtService: GetJwtService) {}
  userName!: string;
  wins!: number;
  loses!: number;

  ngOnInit(): void {
    const token = this.jwtService.getToken();
    if (token) {
      this.http
        .get(environment.Server_URL + 'find-user')
        .pipe(
          map((res) => {
            return res as any;
          })
        )
        .subscribe((res) => {
          this.userName = res.userName;
          this.wins = res.wins;
          this.loses = res.loses;
        });
    }
  }
}
