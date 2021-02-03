# Sogeti Angular course - Forms
## Modules
0. [Core Concepts](https://github.com/sogeti-omnichannel/angular-fundamentals)
1. [Getting started](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/1-getting-started)
1. [Routing](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/2-routing)
1. [Components & Services](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/3-components-and-services)
1. **Forms**
1. [Observables](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/5-observables)
1. [Bonus](https://github.com/sogeti-omnichannel/angular-fundamentals/tree/6-bonus)
## 1. Adding a match
- Create a link to navigate to the form

**src/match/match-list/match-list.component.html**
```html
<a routerLink="/match/add">Add Match</a>
```

Import the reactive forms module in the match module, by adding `ReactiveFormsModule` to the imports array
**src/match/match.module.ts**
```typescript
import { ReactiveFormsModule } from '@angular/forms';
```

Use formbuilder to create the form with validators
**src/match/match-add/match-add.component.ts**
- Import FormBuilder, FormGroup and Validators at the top of `match-add.component.ts`.
```typescript
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
```

- Add addMatchForm as public property to the class.
- Use dependency injection to make FormBuilder available within the class named as property fb.
- Setup the form in the ngOnInit() function.
```typescript
export class MatchAddComponent {
  public addMatchForm: FormGroup

  constructor(
    private fb: FormBuilder,
  ) {
    this.addMatchForm = this.fb.group({
      player1name: ['', Validators.required],
      player1score: ['', Validators.min(0)],
      player2name: ['', Validators.required],
      player2score: ['', Validators.min(0)],
    });
  }
}
```

Render the form
**src/match/match-add/match-add.component.html**
```html
<h2>Add Match</h2>
<form [formGroup]="addMatchForm" (ngSubmit)="onSubmit()">
  <div class="player1">
    <input type="text" formControlName="player1name" placeholder="Player 1">
    <input type="number" formControlName="player1score" placeholder="Score">
    <div *ngIf="!addMatchForm.get('player1name')?.pristine && addMatchForm.get('player1name')?.hasError('required')">
      Player name is required
    </div>
    <div *ngIf="!addMatchForm.get('player1score')?.pristine && addMatchForm.get('player1score')?.hasError('min')">
      Score needs to be 0 or higher
    </div>
  </div>
  vs
  <div class="player2">
    <input type="text" formControlName="player2name" placeholder="Player 2">
    <input type="number" formControlName="player2score" placeholder="Score">
    <div *ngIf="!addMatchForm.get('player2name')?.pristine && addMatchForm.get('player2name')?.hasError('required')">
      Player name is required
    </div>
    <div *ngIf="!addMatchForm.get('player2score')?.pristine && addMatchForm.get('player2score')?.hasError('min')">
      Score needs to be 0 or higher
    </div>
  </div>

  <div>
    <button type="submit" [disabled]="!addMatchForm.valid">Add</button>
  </div>
</form>
```
## 2. Writing to service
Add function to match service to store new matches
**src/match/match.service.ts**
```typescript
  add(match:Match): Match{
    match.date = new Date();
    this.matches.push(match);
    return match;
  }
```

Bind it to onSubmit
**src/match/match-add/match-add.component.ts**
```typescript
  constructor(private fb: FormBuilder, private matchService: MatchService) { }

  onSubmit() {
    this.matchService.add(
      this.addMatchForm.value
    );
  }
```

**src/match/match-add/match-add.component.html**
```html
  <form [formGroup]="addMatchForm" (ngSubmit)="onSubmit()">
```