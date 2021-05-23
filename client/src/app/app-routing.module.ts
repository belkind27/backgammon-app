import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  },
  { path: `**`, component: HomeMainComponent },
  { path: ``, component: HomeMainComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
