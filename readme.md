# Sogeti Angular course - Bonus
# Edit match
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
