import { Component, OnInit, Renderer2 } from '@angular/core';
import { Color, Dices, Player } from '../../models';
import { GameHandlerService } from '../../services/game-handler.service';
import { GameResultService } from '../../services/game-result.service';

@Component({
  selector: 'app-game-main',
  templateUrl: './game-main.component.html',
  styleUrls: ['./game-main.component.css'],
  providers: [GameHandlerService, GameResultService],
})
export class GameMainComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private gameService: GameHandlerService,
    private gameRes: GameResultService
  ) {}
  gameBoardLogic!: Player[][];
  gameBoardView!: Player[][];
  jail!: Player[];
  playerColor!: Color;
  isMyTurn!: boolean;
  diceRes!: Dices;
  slotToMoveFrom!: number;
  jailIndex!: number;
  isInJail!: boolean;
  isInFinish!: boolean;
  numOfPlayersRemove = 0;
  ngOnInit(): void {
    this.initGame();
  }
  getDiceRes(res: Dices): void {
    this.diceRes = res;
    if (this.jail.find((player) => player.color === this.playerColor)) {
      this.slotToMoveFrom = this.jailIndex;
      this.isInJail = true;
      this.colorRelevantSlots(this.jailIndex);
    }
  }
  initGame(): void {
    this.gameBoardLogic = this.gameService.createNewBoard();
    this.playerColor = this.gameService.getPlayerColor();
    this.gameService.getTurn().subscribe((res) => {
      this.isMyTurn = true;
      if (res.gameBoard.length === 0) {
        alert('You Lost');
        this.gameRes.gameLost();
        this.gameService.gameEnded();
      }
      this.gameBoardLogic = res.gameBoard;
      this.jail = res.gameJail;
      this.convertToHtmlView();
    });
    if (this.playerColor === Color.Black) {
      this.jailIndex = 24;
      this.isMyTurn = true;
    } else {
      this.jailIndex = -1;
      this.isMyTurn = false;
    }
    this.jail = [];
    this.isInFinish = true;
    this.convertToHtmlView();
  }
  convertToHtmlView(): void {
    this.gameBoardView = this.gameService.convertLogicBoardToView(
      this.playerColor,
      this.gameBoardLogic
    );
  }
  clickSlot(index: number): void {
    const fixedIndex = this.gameService.convertToLogicIndex(
      index,
      this.playerColor
    );
    if (
      this.gameBoardLogic[fixedIndex].find(
        (player) => player.color === this.playerColor
      ) &&
      !this.isInJail
    ) {
      this.slotToMoveFrom = index;
      this.colorRelevantSlots(fixedIndex);
    }
  }
  colorRelevantSlots(logicIndex: number): void {
    const suggestedSlotId1 = this.gameService.createSuggestion(
      this.diceRes.dice1,
      logicIndex,
      this.playerColor,
      this.gameBoardLogic
    );
    const suggestedSlotId2 = this.gameService.createSuggestion(
      this.diceRes.dice2,
      logicIndex,
      this.playerColor,
      this.gameBoardLogic
    );
    if (this.isInJail && suggestedSlotId1 === 100 && suggestedSlotId2 === 100) {
      this.endTurn();
    }
    for (let i = 0; i < 24; i++) {
      if (i === suggestedSlotId1 || i === suggestedSlotId2) {
        this.renderer.setAttribute(
          document.getElementById(i.toString()),
          'option',
          'true'
        );
      } else {
        this.renderer.setAttribute(
          document.getElementById(i.toString()),
          'option',
          'false'
        );
      }
    }
  }
  isDraggable(color: Color): boolean {
    return color === this.playerColor;
  }
  onDrag(e: DragEvent, slotIndex: number): void {
    e.dataTransfer?.setData('slot-id', slotIndex.toString());
  }
  onDrop(e: DragEvent, slotIndex: number): void {
    // tslint:disable-next-line: radix
    const originalIndex = Number.parseInt(
      e.dataTransfer?.getData('slot-id') as string
    );
    const currentSlot = document.getElementById(slotIndex.toString());
    // checks if move is valid
    if (
      currentSlot?.getAttribute('option') === 'true' &&
      originalIndex === this.slotToMoveFrom
    ) {
      // add player to new array

      this.gameBoardLogic[
        this.gameService.convertToLogicIndex(slotIndex, this.playerColor)
      ].push({
        color: this.playerColor,
      });
      // remove from old array or from jail

      if (originalIndex === this.jailIndex) {
        for (let index = 0; index < this.jail.length; index++) {
          const element = this.jail[index];
          if (element.color === this.playerColor) {
            this.jail.splice(index, 1);
            break;
          }
        }
      } else {
        this.deletePlayerFromSlot(
          this.gameService.convertToLogicIndex(originalIndex, this.playerColor)
        );
      }

      // remove dice from options

      if (this.diceRes.db2 !== 0) {
        this.diceRes.db2 = 0;
      } else {
        if (this.diceRes.db1 !== 0) {
          this.diceRes.db1 = 0;
        } else {
          let sum;
          if (this.playerColor === Color.Black) {
            sum =
              this.gameService.convertToLogicIndex(
                originalIndex,
                this.playerColor
              ) -
              this.gameService.convertToLogicIndex(slotIndex, this.playerColor);
          } else {
            sum =
              this.gameService.convertToLogicIndex(
                slotIndex,
                this.playerColor
              ) -
              this.gameService.convertToLogicIndex(
                originalIndex,
                this.playerColor
              );
          }
          if (this.isInJail) {
            if (this.playerColor === Color.Black) {
              sum -= 1;
            } else {
              sum += 1;
            }
          }
          sum === this.diceRes.dice1
            ? (this.diceRes.dice1 = 0)
            : (this.diceRes.dice2 = 0);
        }
      }

      // check if in jail and adjust accordingly

      if (this.isInJail) {
        if (this.jail.find((player) => player.color === this.playerColor)) {
          this.colorRelevantSlots(this.jailIndex);
        } else {
          this.isInJail = false;
        }
      } else {
        this.colorRelevantSlots(
          this.gameService.convertToLogicIndex(originalIndex, this.playerColor)
        );
      }
      this.isOppPlayerEaten(
        this.gameService.convertToLogicIndex(slotIndex, this.playerColor)
      );
      this.convertToHtmlView();
      this.isInFinishPase();
    }
  }
  allowDrop(e: any): void {
    e.preventDefault();
  }
  endTurn(): void {
    this.isMyTurn = false;
    this.gameService.nextTurn(this.gameBoardLogic, this.jail);
  }
  isOppPlayerEaten(logicIndex: number): void {
    // checks if the slot the player just moved to have 1 or more opp players

    const currentSlot = this.gameBoardLogic[logicIndex];
    if (this.gameService.oppPlayerInSlot(currentSlot, this.playerColor) === 1) {
      // if theres only one opp player in slot its been eaten
      let removed;
      for (let index = 0; index < currentSlot.length; index++) {
        const element = currentSlot[index];
        if (element.color !== this.playerColor) {
          removed = currentSlot.splice(index, 1);
          break;
        }
      }
      if (removed) {
        this.jail.push(removed[0]);
      }
    }
  }
  isInFinishPase(): void {
    let playersInEnd = 0;
    if (this.playerColor === Color.Black) {
      for (let index = 5; index > -1; index--) {
        const element = this.gameBoardLogic[index];
        element.forEach((player) => {
          if (this.playerColor === player.color) {
            playersInEnd += 1;
          }
        });
      }
    } else {
      for (let index = 18; index < 24; index++) {
        const element = this.gameBoardLogic[index];
        element.forEach((player) => {
          if (this.playerColor === player.color) {
            playersInEnd += 1;
          }
        });
      }
    }
    this.isInFinish = playersInEnd === 15 - this.numOfPlayersRemove;
  }
  removePlayer(viewIndex: number): void {
    // checks player in relevant phase
    if (this.isInFinish) {
      // checks if there is player in relevant slot

      const relevantSlot1 = this.gameService.getRelevantEndSlotIndex(
        this.diceRes.dice1,
        this.playerColor
      );
      const relevantSlot2 = this.gameService.getRelevantEndSlotIndex(
        this.diceRes.dice2,
        this.playerColor
      );
      const logicIndex = this.gameService.convertToLogicIndex(
        viewIndex,
        this.playerColor
      );
      if (logicIndex === relevantSlot1) {
        if (this.diceRes.db1 !== 0) {
          this.diceRes.db1 = 0;
        } else {
          if (this.diceRes.db2 !== 0) {
            this.diceRes.db2 = 0;
          } else {
            this.diceRes.dice1 = 0;
          }
        }
        this.deletePlayerFromSlot(logicIndex);
        this.numOfPlayersRemove++;
      } else {
        if (logicIndex === relevantSlot2) {
          this.diceRes.dice2 = 0;
          this.deletePlayerFromSlot(logicIndex);
          this.numOfPlayersRemove++;
        } else {
          // if the player ain't in the relevant slot check if remove is legal
          // dice 1
          let isSlotValid = true;
          if (this.playerColor === Color.Black) {
            for (let index = relevantSlot1; index < 6; index++) {
              const element = this.gameBoardLogic[index];
              if (element.length > 0) {
                isSlotValid = false;
              }
            }
          } else {
            for (let index = relevantSlot1; index > 17; index--) {
              const element = this.gameBoardLogic[index];
              if (element.length > 0) {
                isSlotValid = false;
              }
            }
          }
          if (isSlotValid && relevantSlot1 !== 17 && relevantSlot1 !== 6) {
            this.deletePlayerFromSlot(logicIndex);
            this.numOfPlayersRemove++;
            if (this.diceRes.db1 !== 0) {
              this.diceRes.db1 = 0;
            } else {
              if (this.diceRes.db2 !== 0) {
                this.diceRes.db2 = 0;
              } else {
                this.diceRes.dice1 = 0;
              }
            }
          } else {
            // dice 2
            isSlotValid = true;
            if (this.playerColor === Color.Black) {
              for (let index = relevantSlot2; index < 6; index++) {
                const element = this.gameBoardLogic[index];
                if (element.length > 0) {
                  isSlotValid = false;
                }
              }
            } else {
              for (let index = relevantSlot2; index > 17; index--) {
                const element = this.gameBoardLogic[index];
                if (element.length > 0) {
                  isSlotValid = false;
                }
              }
            }
            if (isSlotValid && relevantSlot2 !== 17 && relevantSlot2 !== 6) {
              this.deletePlayerFromSlot(logicIndex);
              this.numOfPlayersRemove++;
              this.diceRes.dice2 = 0;
            }
          }
        }
      }
      this.isPlayerWon();
    }
  }
  deletePlayerFromSlot(slotIndex: number): void {
    const arrayToBeRemovedFrom = this.gameBoardLogic[slotIndex];
    for (let index = 0; index < arrayToBeRemovedFrom.length; index++) {
      const element = arrayToBeRemovedFrom[index];
      if (element.color === this.playerColor) {
        arrayToBeRemovedFrom.splice(index, 1);
        break;
      }
    }
  }
  isPlayerWon(): void {
    if (this.numOfPlayersRemove === 15) {
      alert('You Won!!!');
      this.gameRes.gameWon();
      this.gameService.nextTurn([], []);
      this.gameService.gameEnded();
    }
  }
}
