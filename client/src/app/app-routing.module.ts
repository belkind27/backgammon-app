import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginMainComponent } from './modules/login-page/components/login-main/login-main.component';

const routes: Routes = [
  {
    path: `Login`,
    component: LoginMainComponent,
  },
  { path: `**`, component: LoginMainComponent },
  { path: ``, component: LoginMainComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
