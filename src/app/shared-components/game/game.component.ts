import { GameDataService } from './../gameData/game-data.service';
import { PrimeNGConfig } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
 
  constructor(private primeNg: PrimeNGConfig,
              public gameData: GameDataService
              ) { }

  ngOnInit(): void {
    this.primeNg.ripple = true;
  }
  reset(){
    this.gameData.arr = ['','','','','','','','',''];
  }
  getRand() {
    return Math.floor((Math.random() * 9) + 0);
  }
  insert(index){
    let i=0;
    if(this.gameData.arr[index]=='') {
      this.gameData.arr[index] = 'pi-check';
      this.gameData.yourScore+=1;
    }
    else return false;
    while(this.gameData.arr[i]!='' && i<8) i++;
    if(i==8) return false; 
    this.gameData.blocked = true;
    this.gameData.playerTurn = "Bot's";
    this.easyMode();
  }
  easyMode() {
    let num =0;
    setTimeout(() => {
      this.gameData.playerTurn = "your";
      num = this.getRand();
      while(this.gameData.arr[num]!='') num = this.getRand();
      this.gameData.arr[num] = 'pi-times';
    this.gameData.blocked = false;
    }, 500);
  }
  mediumMode() {
    let num =0;
    setTimeout(() => {
      num = this.getRand();
      while(this.gameData.arr[num]!='') num = this.getRand();
      this.gameData.arr[num] = 'pi-times';
    this.gameData.blocked = false;
    }, 1000);
  }
}
