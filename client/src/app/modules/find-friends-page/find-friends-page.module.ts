import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindFriendsMainComponent } from './components/find-friends-main/find-friends-main.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FindFriendsMainComponent],
  imports: [CommonModule, HttpClientModule, RouterModule],
  exports: [FindFriendsMainComponent],
})
export class FindFriendsPageModule {}
