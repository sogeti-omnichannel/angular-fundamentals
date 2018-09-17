import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayerRankComponent } from './player-rank/player-rank.component';

@NgModule({
  imports: [
    CommonModule,
    PlayerRoutingModule
  ],
  declarations: [PlayerRankComponent]
})
export class PlayerModule { }
