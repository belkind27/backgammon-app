import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { LoginPageModule } from './modules/login-page/login-page.module';
import { GamePageModule } from './modules/game-page/game-page.module';
import { HomePageModule } from './modules/home-page/home-page.module';
import { FindFriendsPageModule } from './modules/find-friends-page/find-friends-page.module';
import { SetHeadersInterceptor } from './core/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
const socketioConfig: SocketIoConfig = {
  url: 'http://localhost:4000',
  options: {},
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CoreModule,
    LoginPageModule,
    GamePageModule,
    HomePageModule,
    FindFriendsPageModule,
    SocketIoModule.forRoot(socketioConfig),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SetHeadersInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
