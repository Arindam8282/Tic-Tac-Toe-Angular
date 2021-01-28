import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  display: boolean = true;
  winner: String = '';
  arr: String[]=['','','','','','','','',''];
  blocked: boolean = false;
  playerTurn: String = "Your";
  player1Name: String  = "Player1";
  player2Name: String  = "Player2";
  player1Icon: String = "pi-check";
  player2Icon: String = "pi-times";
  yourScore: number = 0;
  opoScore: number = 0;
  tied: number = 0;
  constructor() { }
}
