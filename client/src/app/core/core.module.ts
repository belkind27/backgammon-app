import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FriendsBarComponent } from './components/friends-bar/friends-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { ChatBarComponent } from './components/chat-bar/chat-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { InviteDialogComponent } from './components/invite-dialog/invite-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    TopBarComponent,
    FriendsBarComponent,
    ChatBarComponent,
    InviteDialogComponent,
  ],
  entryComponents: [InviteDialogComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule,
  ],
  exports: [TopBarComponent, FriendsBarComponent, ChatBarComponent],
})
export class CoreModule {}
