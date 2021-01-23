import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {AvatarModule} from 'primeng/avatar';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    AvatarModule
  ],
  exports:[
    ButtonModule,
    AvatarModule
  ]
})
export class PrimeNgModule { }
