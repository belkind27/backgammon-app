import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeMainComponent],
  imports: [CommonModule, RouterModule],
  exports: [HomeMainComponent],
})
export class HomePageModule {}
