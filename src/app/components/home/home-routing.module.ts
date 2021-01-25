import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'singleplayer',
    loadChildren: () => import('../single-player/single-player.module').then(m => m.SinglePlayerModule)
  },
  {
    path: 'multiplayer',
    loadChildren: () => import('../multi-player/multi-player.module').then(m => m.MultiPlayerModule)
  },
  {
    path:'',
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
