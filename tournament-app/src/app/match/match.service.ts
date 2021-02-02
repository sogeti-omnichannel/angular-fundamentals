import { Injectable } from '@angular/core';
import { MATCHES } from '../mock-data';
import { Match } from './match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  _matches: Match[] = MATCHES;

  get matches(): Match[] {
    return this._matches;
  }

  add(match: Match): Match {
    console.log('adding', match);
    match.date = new Date();
    this._matches.push(match);
    return match;
  }
}
