# Sogeti Angular course - Forms

## 1. Adding a match
- Create a link to navigate to the form

**match-list.component.html**
```html
<a routerLink="/match/add">Add Match</a>
```

- Import the reactive forms module in the match module, by adding `ReactiveFormsModule` to the imports array
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