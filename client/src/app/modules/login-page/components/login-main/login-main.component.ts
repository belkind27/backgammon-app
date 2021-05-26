import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetJwtService } from 'src/app/core/services/get-jwt.service';
import { SocketHandlerService } from 'src/app/core/services/socket-handler.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-main',
  templateUrl: './login-main.component.html',
  styleUrls: ['./login-main.component.css'],
  providers: [LoginService],
})
export class LoginMainComponent implements OnInit {
  model: User = new User();
  constructor(
    private loginService: LoginService,
    private tokenService: GetJwtService,
    private router: Router,
    private socketService: SocketHandlerService
  ) {}
  submit(): void {
    this.loginService
      .login(this.model.name, this.model.password)
      .subscribe((res) => {
        if (res.token) {
          this.tokenService.setToken(res.token);
          this.socketService.login(res.id)
          this.router.navigateByUrl('Home');
        } else {
          alert('Something went wrong please try later');
        }
      });
  }
  ngOnInit(): void {}
}
export class User {
  id!: string;
  name!: string;
  password!: string;
  friends!: User[];
  wins!: number;
  loses!: number;
  constructor() {}
}
