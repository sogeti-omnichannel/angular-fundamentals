# Sogeti Angular course - Components & Services
## 1. Create match list
- Merge files from `/server/frontend/src/` in the tournament-app project (`/tournament-app/src/`)
- Render the items in the template

**match-list.component.html**
```html
<h2>Match History</h2>
<ul>
  <li *ngFor="let match of matches">
    {{ match.date | date }}: {{match.player1name}}
    <strong>{{match.player1score}}</strong> -
    <strong>{{match.player2score}}</strong> {{match.player2name}}
    <a routerLink="/match/edit/{{match.id}}">edit</a>
  </li>
</ul>
```

## 2. Call match service from list component
**match-list.component.ts**
```typescript
  matches: Match[] = [];
  constructor(private matchService: MatchService) { }

  ngOnInit() {
    this.matches = this.matchService.getMatches();
  }
```

## 3. Generate services
- run `ng generate service match/match`
- run `ng generate service player/player`
- Return mock data from service

**match.service.ts**
```typescript
import { Injectable } from '@angular/core';
import { Match } from './match';

import { MATCHES } from './../mock-data';

@Injectable()
export class MatchService {

  matches: Match[] = MATCHES;
  constructor() {
  }
  getMatches(): Match[] {
    return matches;
  }
```

- Provide service in module
**match.module.ts**
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { MatchService } from './match.service';
...
providers: [MatchService]
...
```

## 4. Update the components
- Splitting the template
- Render each item individually

- !important
LET THE PEOPLE create the underlying code, copy the previous code to match-list-item and put down the selector belows and let them add the input field in Match-list-item.


**match-list-item.component.html**
```html
{{ match.date | date }}: {{match.player1name}}
<strong>{{match.player1score}}</strong> -
<strong>{{match.player2score}}</strong> {{match.player2name}}
```

**match-list-item.component.ts**
```typescript
import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../match';

@Input() match: Match;
```

- Render the items in the template
**match-list.component.html**
```html
<h2>Match History</h2>
<ul>
  <li *ngFor="let match of matches"> 
    <app-match-list-item [match]="match"></app-match-list-item>
    <a routerLink="/match/edit/{{match.id}}">edit</a>
  </li>
</ul>
```