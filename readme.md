# Sogeti Angular course - Observables
## Modules
0. [Core Concepts](https://github.com/sogeti-omnichannel/angular-fundamentals)
1. [Getting started](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/1-getting-started)
1. [Routing](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/2-routing)
1. [Components & Services](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/3-components-and-services)
1. [Forms](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/4-forms)
1. **Observables**
1. [Bonus](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/6-bonus)
## 1. Using back end to get matches
Import the `HttpClientModule` in the match module
**src/app/match/match.module.ts**
```typescript
import { HttpClientModule } from '@angular/common/http';
```

Update function for getMatches to use http
**src/app/match/match.service.ts**
```typescript
export class MatchService {
  _matches: Match[] = MATCHES;
  baseUrl = 'http://localhost:8080';
  matchUrl = '/api/match';

  constructor(private http: HttpClient) { }

  get matches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.baseUrl + this.matchUrl);
  }

  add(match: Match): Match {
    match.date = new Date();
    this._matches.push(match);
    return match;
  }
}
```

Update component to subscribe to changes
**src/app/match/match-list/match-list.component.ts**
```typescript
export class MatchListComponent implements OnInit {
  matches: Match[] = [];

  constructor(private matchService: MatchService) { }

  ngOnInit(): void {
    this.matchService.matches.subscribe(
        matches => this.matches = matches
    );
  }
}
```
 
## 2. Using back end to add matches
Update add function to call the API using the `post()` method.
**src/app/match/match.service.ts**
```typescript
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
```

Subscribe to changes in add component
**src/app/match/match-add/match-add.component.ts**
```typescript
  onSubmit() {
    this.matchService.add(
      this.addMatchForm.value
    ).subscribe();
  }
```

Navigate back to `match/list` route after adding the score
**src/app/match/match-add/match-add.component.ts**
```typescript
  constructor(...
    private router: Router,
  ) { 
    ...
  }

  onSubmit() {
    this.matchService.add(
      this.addMatchForm.value
    ).subscribe(() => {
      this.router.navigate(['/match/list']);
    });
  }
```