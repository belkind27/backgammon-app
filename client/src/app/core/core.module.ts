import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FriendsBarComponent } from './components/friends-bar/friends-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { ChatBarComponent } from './components/chat-bar/chat-bar.component';

@NgModule({
  declarations: [TopBarComponent, FriendsBarComponent, ChatBarComponent],
  imports: [CommonModule, MatMenuModule],
  exports: [TopBarComponent, FriendsBarComponent, ChatBarComponent],
})
export class CoreModule {}
