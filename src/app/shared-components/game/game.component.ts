import { PrimeNGConfig } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  display: boolean = true;
  arr: String[]=['','','','','','','','',''];
  blocked: boolean = false;
  playerTurn: String = "Your";
  yourScore: number = 0;
  opoScore: number = 0;
  tied: number = 0;
  constructor(private primeNg: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primeNg.ripple = true;
  }
  reset(){
    this.arr = ['','','','','','','','',''];
  }
  getRand() {
    return Math.floor((Math.random() * 9) + 0);
  }
  insert(index){
    let i=0;
    if(this.arr[index]=='') {
      this.arr[index] = 'pi-check';
      this.yourScore+=1;
    }
    else return false;
    while(this.arr[i]!='' && i<8) i++;
    if(i==8) return false; 
    this.blocked = true;
    this.playerTurn = "Bot's";
    this.easyMode();
  }
  easyMode() {
    let num =0;
    setTimeout(() => {
      this.playerTurn = "your";
      num = this.getRand();
      while(this.arr[num]!='') num = this.getRand();
      this.arr[num] = 'pi-times';
    this.blocked = false;
    }, 500);
  }
  mediumMode() {
    let num =0;
    setTimeout(() => {
      num = this.getRand();
      while(this.arr[num]!='') num = this.getRand();
      this.arr[num] = 'pi-times';
    this.blocked = false;
    }, 1000);
  }
}
