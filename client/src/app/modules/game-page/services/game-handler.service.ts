import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketHandlerService } from 'src/app/core/services/socket-handler.service';
import { Color, Player } from '../models';

@Injectable()
export class GameHandlerService {
  // black needs to move from index 23 to 0
  // white needs to move from index 0 to 23

  constructor(private socketService: SocketHandlerService) {}
  createNewBoard(): Player[][] {
    const board = [[{ color: Color.White }, { color: Color.White }]];
    for (let index = 1; index < 24; index++) {
      switch (index) {
        case 5:
          board.push([
            { color: Color.Black },
            { color: Color.Black },
            { color: Color.Black },
            { color: Color.Black },
            { color: Color.Black },
          ]);
          break;
        case 7:
          board.push([
            { color: Color.Black },
            { color: Color.Black },
            { color: Color.Black },
          ]);
          break;
        case 11:
          board.push([
            { color: Color.White },
            { color: Color.White },
            { color: Color.White },
            { color: Color.White },
            { color: Color.White },
          ]);
          break;
        case 12:
          board.push([
            { color: Color.Black },
            { color: Color.Black },
            { color: Color.Black },
            { color: Color.Black },
            { color: Color.Black },
          ]);
          break;
        case 16:
          board.push([
            { color: Color.White },
            { color: Color.White },
            { color: Color.White },
          ]);
          break;
        case 18:
          board.push([
            { color: Color.White },
            { color: Color.White },
            { color: Color.White },
            { color: Color.White },
            { color: Color.White },
          ]);
          break;
        case 23:
          board.push([{ color: Color.Black }, { color: Color.Black }]);
          break;
        default:
          board.push([]);
          break;
      }
    }
    return board;
  }
  getPlayerColor(): Color {
    const config = sessionStorage.getItem('game-config');
    if (config) {
      const color = JSON.parse(config).yourColor;
      return color as Color;
    }
    return Color.Black;
  }
  getTurn(): Observable<any> {
    return this.socketService.getTurn();
  }
  nextTurn(board: Player[][], jail: Player[]): void {
    this.socketService.sendTurn(board, jail);
  }
  convertLogicBoardToView(
    playerColor: Color,
    boardLogic: Player[][]
  ): Player[][] {
    if (playerColor === Color.Black) {
      return boardLogic.slice(12, 24).concat(boardLogic.slice(0, 12).reverse());
    } else {
      return boardLogic.slice(0, 12).concat(boardLogic.slice(12, 24).reverse());
    }
  }
  convertToLogicIndex(index: number, color: Color): number {
    if (color === Color.Black) {
      if (index < 12) {
        return index + 12;
      } else {
        return 23 - index;
      }
    } else {
      if (index < 12) {
        return index;
      } else {
        return index + (11 - (index - 12) * 2);
      }
    }
  }
  convertToViewIndex(index: number, color: Color): number {
    if (color === Color.Black) {
      if (index > 11) {
        return index - 12;
      } else {
        return 23 - index;
      }
    } else {
      if (index < 12) {
        return index;
      } else {
        return index - (11 - (23 - index) * 2);
      }
    }
  }
  createSuggestion(
    diceRes: number,
    index: number,
    color: Color,
    players: Player[][]
  ): number {
    if (color === Color.Black) {
      const slotToCheck = players[index - diceRes];
      if (!slotToCheck) {
        return 100;
      }
      const numOfOppInSlot = this.oppPlayerInSlot(slotToCheck, color);
      if (numOfOppInSlot >= 2) {
        return 100;
      }
      if (diceRes !== 0 && index - diceRes >= 0) {
        return this.convertToViewIndex(index - diceRes, color);
      }
    } else {
      const slotToCheck = players[index + diceRes];
      if (!slotToCheck) {
        return 100;
      }
      const numOfOppInSlot = this.oppPlayerInSlot(slotToCheck, color);
      if (numOfOppInSlot >= 2) {
        return 100;
      }
      if (diceRes !== 0 && index + diceRes <= 23) {
        return this.convertToViewIndex(index + diceRes, color);
      }
    }
    return 100;
  }
  oppPlayerInSlot(players: Player[], color: Color): number {
    const oppPlayers = players.filter((player) => player.color !== color);
    return oppPlayers.length;
  }
  getRelevantEndSlotIndex(diceRes: number, color: Color): number {
    if (diceRes === 0) {
      if (color === Color.Black) {
        return 6;
      } else {
        return 17;
      }
    }
    if (color === Color.Black) {
      return diceRes - 1;
    } else {
      return 24 - diceRes;
    }
  }
  gameEnded(): void {
    this.socketService.gameEnded();
  }
}
