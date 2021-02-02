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
}
