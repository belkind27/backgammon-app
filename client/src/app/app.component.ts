import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { GetJwtService } from './core/services/get-jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isShow = false;
  constructor(private jwtService: GetJwtService, private router: Router) {}
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((_) => {
        const token = this.jwtService.getToken();
        if (token) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      });
  }
}
