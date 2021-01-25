import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  display: boolean = true;
  arr: String[]=['','','','','','','','',''];
  blocked: boolean = false;
  playerTurn: String = "Your";
  yourScore: number = 0;
  opoScore: number = 0;
  tied: number = 0;
  constructor() { }
}
