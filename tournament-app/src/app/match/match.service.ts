import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MATCHES } from '../mock-data';
import { Match } from './match';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  _matches: Match[] = MATCHES;
  baseUrl = 'http://localhost:8080';
  matchUrl = '/api/match';

  constructor(private http: HttpClient) { }

  get matches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.baseUrl + this.matchUrl);
  }

  add(match: Match): Observable<Match> {
    return this.http.post<Match>(this.baseUrl + this.matchUrl, match, httpOptions);
  }
}
