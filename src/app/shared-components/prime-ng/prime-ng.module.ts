import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {AvatarModule} from 'primeng/avatar';
import {DialogModule} from 'primeng/dialog';
import {BlockUIModule} from 'primeng/blockui';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    AvatarModule,
    DialogModule,
    BlockUIModule
  ],
  exports:[
    ButtonModule,
    AvatarModule,
    DialogModule,
    BlockUIModule
  ]
})
export class PrimeNgModule { }
