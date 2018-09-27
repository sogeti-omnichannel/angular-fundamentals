import { Injectable } from '@angular/core';
import { Match } from './match';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private matches: Match[] = [];
  baseUrl: string = 'http://localhost:8080';
  matchUrl: string = '/api/match';

  constructor(private http: HttpClient) { }

  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.baseUrl + this.matchUrl);
  }

  getMatch(id: string): Observable<Match> {
    return this.http.get<Match>(`${this.baseUrl}${this.matchUrl}/${id}`);
  }

  add(match:Match): Observable<Match> {
    return this.http.post<Match>(this.baseUrl + this.matchUrl, match, httpOptions)
  }

  update(id: string, match: Match): Observable<Match> {
    return this.http.put<Match>(`${this.baseUrl}${this.matchUrl}/${id}`, match);
  }
}
