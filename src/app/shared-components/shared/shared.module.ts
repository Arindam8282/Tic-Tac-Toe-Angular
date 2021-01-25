import { GameComponent } from './../game/game.component';
import { PrimeNgModule } from './../prime-ng/prime-ng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports:[
    GameComponent
  ]
})
export class SharedModule { }
