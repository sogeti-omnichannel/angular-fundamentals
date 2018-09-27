import { Component, OnInit } from '@angular/core';
import { Match } from '../match';
import { MatchService } from '../match.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
  matches: Match[] = [];

  constructor(private matchService: MatchService) {
  }

  ngOnInit() {
    this.matchService
      .getMatches()
      .subscribe(
        matches => this.matches = matches,
        error => console.log(error)
      )
  }

}
