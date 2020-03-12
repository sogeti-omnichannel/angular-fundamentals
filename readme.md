# Day 1 - Getting started
## Requirements
- Visual Studio Code
- Node.js

## 1. Generate app, modules & components
- run `npm install -g @angular/cli` to install the Angular CLI globally.
- run `ng new tournament-app --routing` to generate a new project called 'tournament-app' and directly generate routing capabilities.
- run `cd tournament-app` to navigate to the generated directory.
- open a new terminal window, navigate to the tournament-app folder and run `npm start`. The Angular CLI already executed `npm install`, so no need to do this manually.

### Generate modules
Besides the default App module our app will get functionalities grouped into the Match and Player module.
- run `ng generate module match --routing`
- run `ng generate module player --routing`

Notice that when modules are generated only files are created. The parent App module is not updated with a reference of the generated modules. We'll have to specify the parent later on ourselves.

### Generate components
- run `ng generate component match/match-add`
- run `ng generate component match/match-edit`
- run `ng generate component match/match-list`
- run `ng generate component match/match-list-item`
- run `ng generate component player/player-rank`

Notice that when components are generated their specified module (Match and Player) are automatically modified to reference the generated component. 

## 2. Add routing to the app
**app.module.ts**
- import MatchModule and PlayerModule and reference them in the imports array.

**match-routing.module.ts**
With routing we can route specific urls to components. If you navigate to for example `http://localhost:4200/match/add` the MatchAddComponent will be displayed within the app.component.html file replacing the `<router-outlet></router-outlet>` element.

```typescript
  { path: 'match/add', component: MatchAddComponent },
  { path: 'match/list', component: MatchListComponent },
```

Autoimport `MatchAddComponent` and `MatchListComponent`.

**player-routing.module.ts**
Repeat the same for the Player module.

```typescript
{ path: 'player/rank', component: PlayerRankComponent }
```

Autoimport `PlayerRankComponent`.

**app-routing.module.ts** 
```typescript
{ path: '', redirectTo: '/match/list', pathMatch: 'full' },
```

**app.component.html**
```html
<h1>Tournament!</h1>
<nav>
    <a routerLink="/match/list">Matches</a>
    <a routerLink="/player/rank">Rank</a>
</nav>
<router-outlet></router-outlet>
```

# Day 2
## 1. Create match list
- copy `frontend/src/` backend to project `src/`
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
!important
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

# Day 3
## 1. Adding a match
- Create a link to navigate to the form

**match-list.component.html**
```html
<a routerLink="/match/add">Add Match</a>
```

- Import the reactive forms module in the match module
**match.module.ts**
```typescript
import { ReactiveFormsModule } from '@angular/forms';
```

- Use formbuilder to create the form with validators

**match-add.component.ts**
- Import FormBuilder, FormGroup and Validators at the top of `match-add.component.ts`.
```typescript
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
```

- Add addMatchForm as public property to the class.
- Use dependency injection to make FormBuilder available within the class named as property fb.
- Setup the form in the ngOnInit() function.
```typescript
  public addMatchForm: FormGroup;

  constructor(private fb: FormBuilder, private matchService: MatchService) { }

  ngOnInit() {
    this.addMatchForm = this.fb.group({
      player1name: ['', Validators.required],
      player1score: ['', Validators.min(0)],
      player2name: ['', Validators.required],
      player2score: ['', Validators.min(0)]
    });
  }
```

- Render the form

**match-add.component.html**
```html
<h2>Add Match</h2>

<form [formGroup]="addMatchForm">
  <div class="player1">
    <input type="text" formControlName="player1name" placeholder="Player 1">
    <input type="number" formControlName="player1score" placeholder="Score">
	<div *ngIf="!addMatchForm.get('player1name').pristine && addMatchForm.get('player1name').hasError('required')">
		Player name is required
	</div>
	<div *ngIf="!addMatchForm.get('player1score').pristine && addMatchForm.get('player1score').hasError('required')">
		Score is required
	</div>
  <div *ngIf="!addMatchForm.get('player1score').pristine && addMatchForm.get('player1score').hasError('min')">
		Score needs to be 0 or higher
	</div>


  </div>
  vs
  <div class="player2">
    <input type="text" formControlName="player2name" placeholder="Player 2">
    <input type="number" formControlName="player2score" placeholder="Score">
	<div><!-- Repeat error handling --></div>
  </div>

  <div>
    <button type="submit" [disabled]="!addMatchForm.valid">Add</button>
  </div>
</form>
```

## 2. Writing to service
- Add function to match service to store new matches

**match.service.ts**
```typescript
  add(match:Match): Match{
    match.date = new Date();
    this.matches.push(match);
    return match;
  }
```

- Bind it to onSubmit

**match-add.component.ts**
```typescript
  constructor(private fb: FormBuilder, private matchService: MatchService) { }

  onSubmit() {
    this.matchService.add(
      this.addMatchForm.value
    );
  }
```

**match-add.component.html**
```html
  (ngSubmit)="onSubmit()"
```

##  3. Using back end to get matches
- Load http client module in match module

**match.module.ts**
```typescript
import { HttpClientModule } from '@angular/common/http';
```

- Update function for getMatches to use http
**match.service.ts**
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

**match-list.component.ts**
```typescript
ngOnInit() {
    this.matchService.getMatches().subscribe(
        matches => this.matches = matches
    );
}
```
 
## 4. Using back end to add matches
- Update add function

**match.service.ts**
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

**match-add.component.ts**
```typescript
  constructor(private fb: FormBuilder, private matchService: MatchService) { }

  onSubmit() {
    this.matchService.add(
      this.addMatchForm.value
    ).subscribe();
  }
```
 
# Bonus material – edit match
### Generate Match Edit component
- run `ng generate component match/match-edit`

### Update route
**match-routing.module.ts**
Add the edit route the match-routing module and make sure to add the id as variable.
```typescript
  { path: 'match/edit/:id', component: MatchEditComponent },
```

### Add link to the edit page
**match-list-item.component.html**
```html
<a routerLink="/match/edit/{{match.id}}">edit</a>
```

Check if the link works in the browser.

## Setup 
**match-edit.component.ts**
```typescript
  import { Component, OnInit, OnChanges } from '@angular/core';
  import { Router, ActivatedRoute, ParamMap } from '@angular/router';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Match } from '../match';
  import { MatchService } from '../match.service';
  import { Observable } from 'rxjs/Observable';
  
  match: Match;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private matchService: MatchService) { }

  editMatchForm = this.fb.group({
    player1name: ['', Validators.required],
    player1score: ['', [Validators.required, Validators.min(0)]],
    player2name: ['', Validators.required],
    player2score: ['', [Validators.required, Validators.min(0)]]
  });

  ngOnInit() {
    this.route.paramMap.subscribe(
        params => this.matchService.getMatch(params.get('id'))
          .subscribe(
            (match) => {
              this.match = match;
              this.editMatchForm.patchValue(this.match);
            }
          )
      );
  }

  onSubmit() {
    this.matchService.update(
      this.match.id,
      this.editMatchForm.value
    ).subscribe((match: Match) => {
      this.router.navigate(['/match/list']);
    });
  }
```

**match-edit.component.html**
```html
  <h2>Edit Match</h2>

  <form [formGroup]="editMatchForm" (ngSubmit)="onSubmit()">
    <div class="player1">
      <input formControlName="player1name" placeholder="Player 1">
      <input formControlName="player1score" placeholder="Score">
    </div>
    vs
    <div class="player2">
      <input formControlName="player2name" placeholder="Player 2">
      <input formControlName="player2score" placeholder="Score">
    </div>
    <div>
      <button type="submit">Save</button>
    </div>
  </form>
```
