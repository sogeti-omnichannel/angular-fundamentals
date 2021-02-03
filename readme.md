# Sogeti Angular course - Components & Services
## Modules
0. [Core Concepts](https://github.com/sogeti-omnichannel/angular-fundamentals)
1. [Getting started](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/1-getting-started)
1. [Routing](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/2-routing)
1. **Components & Services**
1. [Forms](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/4-forms)
1. [Observables](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/5-observables)
1. [Bonus](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/6-bonus)
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
**src/app/match/match-list/match-list.component.html**
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
In the current situation we have a match-list component that contains logic to show a match-list-item for every match. In this section we are going to split this up in two different components: the parent `match-list` will pass data from a single match to the child `match-list-item` component. It will demonstrate the use of the `Input` decorator in a component.

**src/app/match/match-list-item/match-list-item.component.ts**
```typescript
export class MatchListItemComponent {
  @Input() match: Match | undefined;
}
```

Copy the content of the list-item from `match-list` into the `match-list-item` and use the *ngIf directive.
**src/app/match/match-list-item/match-list-item.component.html**
```html
<div *ngIf="match">
  {{ match.date | date }}: {{match.player1name}}
  <strong>{{match.player1score}}</strong> -
  <strong>{{match.player2score}}</strong> {{match.player2name}}
</div>
```

Render the items in the template
**src/app/match/match-list/match-list.component.html**
```html
<h2>Match History</h2>
<ul>
  <li *ngFor="let match of matches"> 
    <app-match-list-item [match]="match"></app-match-list-item>
    <a routerLink="/match/edit/{{match.id}}">edit</a>
  </li>
</ul>
```