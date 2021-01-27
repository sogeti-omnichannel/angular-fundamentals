import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerRankComponent } from './player-rank/player-rank.component';

const routes: Routes = [
  { path: 'player/rank', component: PlayerRankComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
