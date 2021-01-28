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
  gameover: boolean = false;
  cursorClass: String = "";
  constructor(private primeNg: PrimeNGConfig,
              private confirmationService: ConfirmationService,
              public gameData: GameDataService,
              private activeRoute: ActivatedRoute,
              private route: Router
              ) { }

  ngOnInit(): void {
    this.primeNg.ripple = true;
  }
  ability(item) {
    if(item!='') return "dis-cursor";
    else return "";
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
        defaultFocus:'none',
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
 
  insert(index,icon){
    let i=0;
    if(this.gameData.arr[index]=='') 
      this.gameData.arr[index] = icon;
    
    else return false;
    this.cursorClass = "dis-cursor";
    if(this.isGameover()) return true;
    this.botPlayer();
  }
  getRand() {
    return Math.floor((Math.random() * 9) + 0);
  }
  botPlayer() {
    this.gameData.blocked = true;
    this.gameData.playerTurn = "Bot's";
    let num =0;
    setTimeout(() => {
      this.gameData.playerTurn = "Your";
      num = this.getRand();
      while(this.gameData.arr[num]!='') num = this.getRand();
      this.gameData.arr[num] = this.gameData.player2Icon;
      this.gameData.blocked = false;
    if(this.isGameover()) return true;
    }, 500);
  }

  isGameover() {
    let checker = this.check();
    let winner = '';
    if(checker==1 || checker==0 || checker<0) {
      if(checker == 1) {
        this.gameData.yourScore+=1;
        winner = "You've won";
      }
      if(checker == 0) {
        this.gameData.opoScore+=1;
        winner = "Bot won";
      }
      if(checker<0) {
        this.gameData.tied+=1;
        winner = "Game Tied";
      }
      this.gameData.winner = winner;
      this.gameData.arr = ['','','','','','','','',''];
      this.gameover = true;
      let counter = 3;
      var myVar;
      var time = 1000;
      myVar = setInterval(() => {
        this.gameover = false;
        this.confirmationService.confirm({
          message: winner,
          header: 'Play Again',
          acceptLabel: 'Exit',
          rejectLabel:  'press or replaying..'+counter,
          rejectIcon: 'pi pi-undo',
          acceptIcon: 'pi',
          acceptButtonStyleClass:'p-button-danger',
          rejectButtonStyleClass:'p-button-secondary',
          defaultFocus:'none',
          accept: () => {
            this.reset();
            clearInterval(myVar);
            this.route.navigate(['/']);
              // this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
          },
          reject: () => {
            this.confirmationService.close();
            clearInterval(myVar);
              // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
          }
        });
       
          if(counter<1) {
            this.confirmationService.close();
            clearInterval(myVar);
          } 
          counter-=1;
      }, time);
      return true;
    }
    else return false;
  }
  check() {
    if((this.gameData.arr[0]=='pi-times') && (this.gameData.arr[1]=='pi-times') && (this.gameData.arr[2]=='pi-times')) return 0;
    if((this.gameData.arr[0]=='pi-check') && (this.gameData.arr[1]=='pi-check') && (this.gameData.arr[2]=='pi-check')) return 1;
    
    if((this.gameData.arr[3]=='pi-times') && (this.gameData.arr[4]=='pi-times') && (this.gameData.arr[5]=='pi-times')) return 0;  
    if((this.gameData.arr[3]=='pi-check') && (this.gameData.arr[4]=='pi-check') && (this.gameData.arr[5]=='pi-check')) return 1;

    if ((this.gameData.arr[6]=='pi-times') && (this.gameData.arr[7]=='pi-times') && (this.gameData.arr[8]=='pi-times')) return 0;
    if((this.gameData.arr[6]=='pi-check') && (this.gameData.arr[7]=='pi-check') && (this.gameData.arr[8]=='pi-check')) return 1;

    if((this.gameData.arr[0]=='pi-times') && (this.gameData.arr[3]=='pi-times') && (this.gameData.arr[6]=='pi-times')) return 0;
    if((this.gameData.arr[0]=='pi-check') && (this.gameData.arr[3]=='pi-check') && (this.gameData.arr[6]=='pi-check')) return 1;

    if ((this.gameData.arr[1]=='pi-times') && (this.gameData.arr[4]=='pi-times') && (this.gameData.arr[7]=='pi-times')) return 0;
    if((this.gameData.arr[1]=='pi-check') && (this.gameData.arr[4]=='pi-check') && (this.gameData.arr[7]=='pi-check'))  return 1;

    if((this.gameData.arr[2]=='pi-times') && (this.gameData.arr[5]=='pi-times') && (this.gameData.arr[8]=='pi-times')) return 0;
    if((this.gameData.arr[2]=='pi-check') && (this.gameData.arr[5]=='pi-check') && (this.gameData.arr[8]=='pi-check')) return 1;

    if((this.gameData.arr[2]=='pi-times') && (this.gameData.arr[4]=='pi-times') && (this.gameData.arr[6]=='pi-times')) return 0;
    if((this.gameData.arr[2]=='pi-check') && (this.gameData.arr[4]=='pi-check') && (this.gameData.arr[6]=='pi-check')) return 1;

    if((this.gameData.arr[0]=='pi-times') && (this.gameData.arr[4]=='pi-times') && (this.gameData.arr[8]=='pi-times')) return 0;
    if((this.gameData.arr[0]=='pi-check') && (this.gameData.arr[4]=='pi-check') && (this.gameData.arr[8]=='pi-check')) return 1;

    if((this.gameData.arr[0]== 'pi-times'|| this.gameData.arr[0]=='pi-check') && (this.gameData.arr[1]=='pi-times' || this.gameData.arr[1]=='pi-check') && (this.gameData.arr[2]=='pi-times' || this.gameData.arr[2]=='pi-check') && (this.gameData.arr[3]=='pi-times' || this.gameData.arr[3]=='pi-check') && (this.gameData.arr[4]=='pi-times' || this.gameData.arr[4]=='pi-check') && (this.gameData.arr[5]=='pi-times' || this.gameData.arr[5]=='pi-check') && (this.gameData.arr[6]=='pi-times' || this.gameData.arr[6]=='pi-check') && (this.gameData.arr[7]=='pi-times' || this.gameData.arr[7]=='pi-check') && (this.gameData.arr[8]=='pi-times' || this.gameData.arr[8]=='pi-check'))
      return -1;

    return 2;
  }
 
}
