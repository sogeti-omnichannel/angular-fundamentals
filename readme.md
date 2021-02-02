# Sogeti Angular course - Components & Services
## 1. Add mockdata, match and player interface to the project
- Merge files from `/server/frontend/src/` in the tournament-app project (`/tournament-app/src/`)

## 2. Generate services
- run `ng generate service match/match`
- run `ng generate service player/player`
- Return mock data from service

- Provide service in module
**src/match/match.module.ts**
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { MatchService } from './match.service';
...
providers: [MatchService]
...
```

**src/player/player.module.ts**
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { PlayerService } from './player.service';
...
providers: [PlayerService]
...
```

**src/match/match.service.ts**
```typescript
import { Injectable } from '@angular/core';
import { Match } from './match';

import { MATCHES } from './../mock-data';

@Injectable()
export class MatchService {
  _matches: Match[] = MATCHES;

  get matches(): Match[] {
    return this._matches;
  }
}
```

## 3. Call match service from list component
**src/match/match-list/match-list.component.ts**
```typescript
export class MatchListComponent {
  matches = this.matchService.matches;

  constructor(private matchService: MatchService) { }
}
```
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

## 4. Split the match-list component
- Splitting the template
- Render each item individually

**match-list-item.component.ts**
```typescript
export class MatchListItemComponent {
  @Input() match: Match | undefined;
}
```

**match-list-item.component.html**
```html
<div *ngIf="match">
  {{ match.date | date }}: {{match.player1name}}
  <strong>{{match.player1score}}</strong> -
  <strong>{{match.player2score}}</strong> {{match.player2name}}
</div>
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