import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {AvatarModule} from 'primeng/avatar';
import {DialogModule} from 'primeng/dialog';
import {BlockUIModule} from 'primeng/blockui';
import { MessagesModule } from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {InputTextModule} from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import {ToastModule} from 'primeng/toast';
import {PanelModule} from 'primeng/panel';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    AvatarModule,
    DialogModule,
    BlockUIModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    InputTextModule,
    ChipModule,
    ToastModule,
    PanelModule
  ],
  exports:[
    ButtonModule,
    AvatarModule,
    DialogModule,
    BlockUIModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    InputTextModule,
    ChipModule,
    ToastModule,
    PanelModule
  ]
})
export class PrimeNgModule { }
