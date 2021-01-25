import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {AvatarModule} from 'primeng/avatar';
import {DialogModule} from 'primeng/dialog';
import {BlockUIModule} from 'primeng/blockui';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    AvatarModule,
    DialogModule,
    BlockUIModule,
    MessagesModule,
    ConfirmDialogModule
  ],
  exports:[
    ButtonModule,
    AvatarModule,
    DialogModule,
    BlockUIModule,
    MessagesModule,
    ConfirmDialogModule
  ]
})
export class PrimeNgModule { }
