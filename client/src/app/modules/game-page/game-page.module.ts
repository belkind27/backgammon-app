import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameMainComponent } from './components/game-main/game-main.component';
import { DiceComponent } from './components/dice/dice.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [GameMainComponent, DiceComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [GameMainComponent],
})
export class GamePageModule {}
