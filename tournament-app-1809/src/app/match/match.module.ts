import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchRoutingModule } from './match-routing.module';
import { MatchAddComponent } from './match-add/match-add.component';
import { MatchEditComponent } from './match-edit/match-edit.component';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchListItemComponent } from './match-list-item/match-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    MatchRoutingModule
  ],
  declarations: [MatchAddComponent, MatchEditComponent, MatchListComponent, MatchListItemComponent]
})
export class MatchModule { }
