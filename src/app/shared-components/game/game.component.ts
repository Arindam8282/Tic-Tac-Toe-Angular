import { GameDataService } from './../gameData/game-data.service';
import { WebsocketService } from './../../shared-components/service/websocket.service';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Component, Input, OnInit } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class GameComponent implements OnInit {
  @Input('Stype') Visible: boolean=false;
  msgs: Message[] = [];
  holder: string;
  chat: boolean = false;
  chatDis: boolean = false;
  gameover: boolean = false;
  cursorClass: String = "";
  constructor(private primeNg: PrimeNGConfig,
              private confirmationService: ConfirmationService,
              public gameData: GameDataService,
              private activeRoute: ActivatedRoute,
              private route: Router,
              public socketService: WebsocketService,
              private messageService: MessageService
              ) { }

  ngOnInit(): void {
    if(this.Visible==true) {
      this.socketService.roomName = "";
      this.chat = true
    }
    else this.chat = false
    this.socketService.listen("loggedIn").subscribe((data)=>{
      this.socketService.receive = data;
      if(this.socketService.receive.param.roomMember==2) {
        return this.messageService.add({key: 'myKey1',severity:'error', summary:this.socketService.receive.param.roomName, detail:'room is full'});
      }
      if(this.socketService.receive.param.hostName==this.socketService.playerName) {
        this.gameData.blocked=false;
        this.gameData.player1Icon = "pi-check";
      } 
      else{
        this.gameData.blocked=true;
        this.gameData.holder = this.gameData.player1Icon;
        this.gameData.player1Icon = this.gameData.player2Icon;
        this.gameData.player2Icon = this.gameData.holder;
        // this.gameData.player1Icon = "pi-times";
      } 
      this.reset();
      this.Visible = true;
      this.messageService.add({key: 'myKey1',severity:'success', summary:this.socketService.receive.param.playername, detail:'joined'});
      console.log(data);
      console.log(this.socketService.receive.param.hostName," : ",this.socketService.receive.param.playername);
    })
    this.socketService.listen("chatMsg").subscribe((data)=>{
      console.log(data);
      this.socketService.receive = data;
      this.messageService.add({severity:'success', summary:this.socketService.receive.param.playername+' said ', detail:this.socketService.receive.param.message});
      console.log(this.socketService.receive);
    })
    this.socketService.listen("gameData").subscribe((data)=>{
      console.log(data);
      this.socketService.receive = data;
      this.forceInsert(this.socketService.receive.param.index,this.socketService.receive.param.icon);
      // this.messageService.add({severity:'success', summary:this.socketService.receive.param.playername+' said ', detail:this.socketService.receive.param.message});
      console.log(this.socketService.receive);
    })
    this.socketService.listen("disconnected").subscribe((data)=>{
      this.socketService.receive = data
      this.messageService.add({key: 'myKey1',severity:'error', summary:this.socketService.receive.param.playername, detail:'left'});
    })
    this.primeNg.ripple = true;
  }
  openChat() {
    this.chatDis = !this.chatDis;
  }
  sendChat(msg: any){
    this.socketService.login.message = msg;
    this.socketService.emit("chatRoom",this.socketService.login);
    this.socketService.sendMessage = "";
  }
  hideRoom(item) {
    if(item) return 'd-none';
    else return '';
  }
  visibility(item) {
    if(!item) return 'd-none';
    else return '';
  }
  ability(item) {
    if(item!='') return "dis-cursor";
    else return "";
  }
  reset(){
    // this.gameData.blocked = false;
    this.gameData.arr = ['','','','','','','','',''];
    this.gameData.opoScore = this.gameData.tied = this.gameData.yourScore = 0;
  }
  goBack(){
    this.route.navigate(['/']);
  }
  confirm1() {
    this.confirmationService.confirm({
        message: 'Do you want to exit?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        defaultFocus:'none',
        accept: () => {

            this.reset();
            if(this.socketService.roomName!=''){
              this.socketService.login.roomname = this.socketService.roomName
              this.socketService.login.playername = this.socketService.playerName
              this.gameData.blocked = false;
              this.socketService.emit("disconnected",this.socketService.login);
            }
            
            // this.msgs = [{severity:'info', summary:'Rejected', detail:'user disconnected'}];
            this.route.navigate(['/']);
        },
        reject: () => {
            // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }
    });
  }
  forceInsert(index,icon){
    this.gameData.arr[index] = icon;
    this.gameData.blocked=!this.gameData.blocked;
    if(this.isGameover()) return true;
  }
  insert(index,icon){
    let i=0;
    if(this.gameData.arr[index]=='') 
      this.gameData.arr[index] = icon;
    
    else return false;
    this.cursorClass = "dis-cursor";
    this.socketService.login.index = index;
    this.socketService.login.icon = icon;
    // this.socketService.login.token = this.gameData.blocked;
    // if(this.isGameover()) return  this.socketService.emit("gameRoom",this.socketService.login);
    if(this.socketService.roomName=='') this.botPlayer();
    this.socketService.emit("gameRoom",this.socketService.login);
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
    if((this.gameData.arr[0]==this.gameData.player2Icon) && (this.gameData.arr[1]==this.gameData.player2Icon) && (this.gameData.arr[2]==this.gameData.player2Icon)) return 0;
    if((this.gameData.arr[0]==this.gameData.player1Icon) && (this.gameData.arr[1]==this.gameData.player1Icon) && (this.gameData.arr[2]==this.gameData.player1Icon)) return 1;
    
    if((this.gameData.arr[3]==this.gameData.player2Icon) && (this.gameData.arr[4]==this.gameData.player2Icon) && (this.gameData.arr[5]==this.gameData.player2Icon)) return 0;  
    if((this.gameData.arr[3]==this.gameData.player1Icon) && (this.gameData.arr[4]==this.gameData.player1Icon) && (this.gameData.arr[5]==this.gameData.player1Icon)) return 1;

    if ((this.gameData.arr[6]==this.gameData.player2Icon) && (this.gameData.arr[7]==this.gameData.player2Icon) && (this.gameData.arr[8]==this.gameData.player2Icon)) return 0;
    if((this.gameData.arr[6]==this.gameData.player1Icon) && (this.gameData.arr[7]==this.gameData.player1Icon) && (this.gameData.arr[8]==this.gameData.player1Icon)) return 1;

    if((this.gameData.arr[0]==this.gameData.player2Icon) && (this.gameData.arr[3]==this.gameData.player2Icon) && (this.gameData.arr[6]==this.gameData.player2Icon)) return 0;
    if((this.gameData.arr[0]==this.gameData.player1Icon) && (this.gameData.arr[3]==this.gameData.player1Icon) && (this.gameData.arr[6]==this.gameData.player1Icon)) return 1;

    if ((this.gameData.arr[1]==this.gameData.player2Icon) && (this.gameData.arr[4]==this.gameData.player2Icon) && (this.gameData.arr[7]==this.gameData.player2Icon)) return 0;
    if((this.gameData.arr[1]==this.gameData.player1Icon) && (this.gameData.arr[4]==this.gameData.player1Icon) && (this.gameData.arr[7]==this.gameData.player1Icon))  return 1;

    if((this.gameData.arr[2]==this.gameData.player2Icon) && (this.gameData.arr[5]==this.gameData.player2Icon) && (this.gameData.arr[8]==this.gameData.player2Icon)) return 0;
    if((this.gameData.arr[2]==this.gameData.player1Icon) && (this.gameData.arr[5]==this.gameData.player1Icon) && (this.gameData.arr[8]==this.gameData.player1Icon)) return 1;

    if((this.gameData.arr[2]==this.gameData.player2Icon) && (this.gameData.arr[4]==this.gameData.player2Icon) && (this.gameData.arr[6]==this.gameData.player2Icon)) return 0;
    if((this.gameData.arr[2]==this.gameData.player1Icon) && (this.gameData.arr[4]==this.gameData.player1Icon) && (this.gameData.arr[6]==this.gameData.player1Icon)) return 1;

    if((this.gameData.arr[0]==this.gameData.player2Icon) && (this.gameData.arr[4]==this.gameData.player2Icon) && (this.gameData.arr[8]==this.gameData.player2Icon)) return 0;
    if((this.gameData.arr[0]==this.gameData.player1Icon) && (this.gameData.arr[4]==this.gameData.player1Icon) && (this.gameData.arr[8]==this.gameData.player1Icon)) return 1;

    if((this.gameData.arr[0]== this.gameData.player2Icon|| this.gameData.arr[0]==this.gameData.player1Icon) && (this.gameData.arr[1]==this.gameData.player2Icon || this.gameData.arr[1]==this.gameData.player1Icon) && (this.gameData.arr[2]==this.gameData.player2Icon || this.gameData.arr[2]==this.gameData.player1Icon) && (this.gameData.arr[3]==this.gameData.player2Icon || this.gameData.arr[3]==this.gameData.player1Icon) && (this.gameData.arr[4]==this.gameData.player2Icon || this.gameData.arr[4]==this.gameData.player1Icon) && (this.gameData.arr[5]==this.gameData.player2Icon || this.gameData.arr[5]==this.gameData.player1Icon) && (this.gameData.arr[6]==this.gameData.player2Icon || this.gameData.arr[6]==this.gameData.player1Icon) && (this.gameData.arr[7]==this.gameData.player2Icon || this.gameData.arr[7]==this.gameData.player1Icon) && (this.gameData.arr[8]==this.gameData.player2Icon || this.gameData.arr[8]==this.gameData.player1Icon))
      return -1;

    return 2;
  }
  login(msg: any) {
    this.socketService.login.roomname = msg;
    this.socketService.login.playername = this.socketService.playerName;
    this.socketService.emit("loginRoom",this.socketService.login);
  }
 
}
