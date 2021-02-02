# Sogeti Angular course - Observables

## 1. Using back end to get matches
- Load http client module in match module

**match.module.ts**
```typescript
import { HttpClientModule } from '@angular/common/http';
```

- Update function for getMatches to use http
**src/match/match.service.ts**
```typescript
constructor(private http: HttpClient) {

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs;

getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.baseUrl + this.matchUrl);
}

baseUrl: string;
matchUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080';
    this.matchUrl = '/api/match';
  }
```

- Update component to subscribe to changes

**src/match/match-list/match-list.component.ts**
```typescript
ngOnInit() {
    this.matchService.getMatches().subscribe(
        matches => this.matches = matches
    );
}
```
 
## 2. Using back end to add matches
- Update add function

**src/match/match.service.ts**
```typescript
  import { HttpClient, HttpHeaders } from '@angular/common/http';

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  add(match): Observable<Match> {
    return this.http.post<Match>(this.baseUrl + this.matchUrl, match, httpOptions);
  }
```

- Subscribe to changes in add component

**src/match/match-add/match-add.component.ts**
```typescript
  constructor(private fb: FormBuilder, private matchService: MatchService) { }

  onSubmit() {
    this.matchService.add(
      this.addMatchForm.value
    ).subscribe();
  }
```
 