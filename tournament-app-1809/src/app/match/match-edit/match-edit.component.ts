import { Component, OnInit } from '@angular/core';
import { Match } from '../match';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from '../match.service';

@Component({
  selector: 'app-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css']
})
export class MatchEditComponent implements OnInit {
  match: Match;
  editMatchForm: FormGroup = this.fb.group({
    player1name: ['', Validators.required],
    player1score: ['', Validators.min(0)],
    player2name: ['', Validators.required],
    player2score: ['', Validators.min(0)]
  })

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private matchService: MatchService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => this.matchService.getMatch(params.get('id'))
        .subscribe(
          match => {
            this.match = match;
            this.editMatchForm.patchValue(this.match);
          }
        )
    )
  }

  onSubmit() {
    this.matchService.update(
      this.match.id,
      this.editMatchForm.value
    ).subscribe(
      (match: Match) => {
        this.router.navigate(['/match/list']);
      });
  }

}
