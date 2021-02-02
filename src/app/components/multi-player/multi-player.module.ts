import { PrimeNgModule } from './../../shared-components/prime-ng/prime-ng.module';
import { SharedModule } from './../../shared-components/shared/shared.module';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MultiPlayerComponent } from './multi-player.component';
import { MultiPlayerRoutingModule } from './multi-player-routing.module';



@NgModule({
  declarations: [MultiPlayerComponent],
  imports: [
    CommonModule,
    MultiPlayerRoutingModule,
    SharedModule,
    PrimeNgModule,
    FormsModule
  ]
})
export class MultiPlayerModule { }
