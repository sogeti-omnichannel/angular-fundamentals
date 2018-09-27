import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchAddComponent } from './match-add/match-add.component';
import { MatchEditComponent } from './match-edit/match-edit.component';
import { MatchListComponent } from './match-list/match-list.component';

const routes: Routes = [
  { path: 'match/add', component: MatchAddComponent },
  { path: 'match/edit', component: MatchEditComponent },
  { path: 'match/list', component: MatchListComponent },
  { path: 'match/edit/:id', component: MatchEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchRoutingModule { }
