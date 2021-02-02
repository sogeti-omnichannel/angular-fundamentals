import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayerRankComponent } from './player-rank/player-rank.component';
import { PlayerService } from './player.service';


@NgModule({
  declarations: [PlayerRankComponent],
  imports: [
    CommonModule,
    PlayerRoutingModule
  ],
  providers: [
    PlayerService,
  ]
})
export class PlayerModule { }
