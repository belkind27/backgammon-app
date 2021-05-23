import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameMainComponent } from './components/game-main/game-main.component';
import { DiceComponent } from './components/dice/dice.component';

@NgModule({
  declarations: [GameMainComponent, DiceComponent],
  imports: [CommonModule],
  exports: [GameMainComponent],
})
export class GamePageModule {}
