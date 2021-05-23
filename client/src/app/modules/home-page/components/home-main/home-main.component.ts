import { Component, OnInit } from '@angular/core';
import { SocketHandlerService } from 'src/app/core/services/socket-handler.service';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css'],
  providers: [SocketHandlerService],
})
export class HomeMainComponent implements OnInit {
  constructor(private socketService: SocketHandlerService) {}
  isLoading = false;
  ngOnInit(): void {}
  playRandom(): void {
    this.isLoading = true;
    this.socketService.playRandom();
  }
}
