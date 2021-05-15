import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginMainComponent } from './components/login-main/login-main.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginMainComponent],
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [LoginMainComponent],
})
export class LoginPageModule {}
