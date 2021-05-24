import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/guards';
import { GetJwtService } from './core/services/get-jwt.service';
import { FindFriendsMainComponent } from './modules/find-friends-page/components/find-friends-main/find-friends-main.component';
import { GameMainComponent } from './modules/game-page/components/game-main/game-main.component';
import { HomeMainComponent } from './modules/home-page/components/home-main/home-main.component';
import { LoginMainComponent } from './modules/login-page/components/login-main/login-main.component';

const routes: Routes = [
  {
    path: `Login`,
    component: LoginMainComponent,
  },
  {
    path: `Game`,
    component: GameMainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: `FindFriends`,
    component: FindFriendsMainComponent,
  },
  { path: `**`, component: HomeMainComponent, canActivate: [GetJwtService] },
  { path: ``, component: HomeMainComponent, canActivate: [GetJwtService] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
