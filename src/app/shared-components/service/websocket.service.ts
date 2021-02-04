import { Message } from 'primeng/api';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: any;
  // sendMessage: String;
  login: any = {
    username:''
  };
  sendMessage: String;
  receive: any;
  gameover: boolean;
  holder: string;
  roomMember: number;
  playerName: string = "Player1"
  roomName: String = "Player1";
  myData: Message[];
  // url: String = "wss://arindam-tic-tac-toe.herokuapp.com";
  url: String = "ws://192.168.1.8:3000";

  constructor() {
    this.socket = io(this.url);
   }
  listen(eventName: String) {
    return new Observable((subsciber)=>{
        this.socket.on(eventName,(data)=>{
          subsciber.next(data);
        })
    })
  }
  emit(eventName: string,data: string) {
    this.socket.emit(eventName,data);
  }
}
