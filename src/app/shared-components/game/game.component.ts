import { GameDataService } from './../gameData/game-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [ConfirmationService]
})
export class GameComponent implements OnInit {
  msgs: Message[] = [];

  constructor(private primeNg: PrimeNGConfig,
              private confirmationService: ConfirmationService,
              public gameData: GameDataService,
              private activeRoute: ActivatedRoute,
              private route: Router
              ) { }

  ngOnInit(): void {
    this.primeNg.ripple = true;
  }
  reset(){
    this.gameData.arr = ['','','','','','','','',''];
    this.gameData.opoScore = this.gameData.tied = this.gameData.yourScore = 0;
  }
  confirm1() {
    this.confirmationService.confirm({
        message: 'Do you want to exit?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.reset();
            this.route.navigate(['/']);
            // this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
        },
        reject: () => {
            // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }
    });
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
      this.gameData.playerTurn = "Your";
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
