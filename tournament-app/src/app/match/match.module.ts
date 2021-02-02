import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchRoutingModule } from './match-routing.module';
import { MatchAddComponent } from './match-add/match-add.component';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchListItemComponent } from './match-list-item/match-list-item.component';
import { MatchService } from './match.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MatchAddComponent, MatchListComponent, MatchListItemComponent],
  imports: [
    CommonModule,
    MatchRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    MatchService,
  ]
})
export class MatchModule { }
