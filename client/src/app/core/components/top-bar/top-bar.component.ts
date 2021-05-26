import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GetJwtService } from '../../services/get-jwt.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  constructor() {}
  @Input() set user(user: any) {
    if (user) {
      this.userName = user.userName;
      this.wins = user.wins;
      this.loses = user.loses;
    }
  }
  userName!: string;
  wins!: number;
  loses!: number;

  ngOnInit(): void {}
}
