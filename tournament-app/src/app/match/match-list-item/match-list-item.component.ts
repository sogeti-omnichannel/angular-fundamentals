import { Component, Input, OnInit } from '@angular/core';
import { Match } from '../match';

@Component({
  selector: 'app-match-list-item',
  templateUrl: './match-list-item.component.html',
  styleUrls: ['./match-list-item.component.css']
})
export class MatchListItemComponent {
  @Input() match: Match | undefined;
}
