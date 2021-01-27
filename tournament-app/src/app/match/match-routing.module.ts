import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchAddComponent } from './match-add/match-add.component';
import { MatchListComponent } from './match-list/match-list.component';

const routes: Routes = [
  { path: 'match/add', component: MatchAddComponent },
  { path: 'match/list', component: MatchListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchRoutingModule { }
