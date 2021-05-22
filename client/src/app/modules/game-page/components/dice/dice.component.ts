import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css'],
})
export class DiceComponent implements OnInit {
  constructor() {}
  @Output() resultsEmitter: EventEmitter<Dices> = new EventEmitter();
  isAbleToRoll = true;
  ngOnInit(): void {}
  rollDice(): void {
   // this.isAbleToRoll = false;
    const dice = document.querySelectorAll('.die-list');
    const diceRes: number[] = [];
    dice.forEach((die) => {
      this.toggleClasses(die);
      const res = this.getRandomNumber(1, 6);
      diceRes.push(res);
      die.setAttribute('data-roll', res.toString());
    });
    if (diceRes[0] === diceRes[1]) {
      this.resultsEmitter.emit({
        dice1: diceRes[0],
        dice2: diceRes[1],
        db1: diceRes[0],
        db2: diceRes[0],
      });
    } else {
      this.resultsEmitter.emit({
        dice1: diceRes[0],
        dice2: diceRes[1],
        db1: 0,
        db2: 0,
      });
    }
  }

  toggleClasses(die: Element): void {
    die.classList.toggle('odd-roll');
    die.classList.toggle('even-roll');
  }

  getRandomNumber(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
export interface Dices {
  dice1: number;
  dice2: number;
  db1: number;
  db2: number;
}
