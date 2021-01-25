import { SinglePlayerRoutingModule } from './single-player-routing.module';
import { SharedModule } from './../../shared-components/shared/shared.module';
import { PrimeNgModule } from './../../shared-components/prime-ng/prime-ng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SinglePlayerComponent } from './single-player.component';

@NgModule({
  declarations: [SinglePlayerComponent],
  imports: [
    CommonModule,
    SinglePlayerRoutingModule,
    PrimeNgModule,
    SharedModule,
  ]
})
export class SinglePlayerModule { }
