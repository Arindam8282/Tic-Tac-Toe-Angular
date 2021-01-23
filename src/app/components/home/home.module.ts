import { PrimeNgModule } from './../../shared-components/prime-ng/prime-ng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimeNgModule
  ],
  exports:[HomeComponent]
})
export class HomeModule { }
