import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameMainComponent } from './modules/game-page/components/game-main/game-main.component';
import { LoginMainComponent } from './modules/login-page/components/login-main/login-main.component';

const routes: Routes = [
  {
    path: `Login`,
    component: LoginMainComponent,
  },
  { path: `**`, component: GameMainComponent },
  { path: ``, component: GameMainComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
