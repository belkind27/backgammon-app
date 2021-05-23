import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeMainComponent } from './components/home-main/home-main.component';

@NgModule({
  declarations: [HomeMainComponent],
  imports: [CommonModule],
  exports: [HomeMainComponent],
})
export class HomePageModule {}
