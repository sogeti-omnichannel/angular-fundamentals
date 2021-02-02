import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchService } from '../match.service';

@Component({
  selector: 'app-match-add',
  templateUrl: './match-add.component.html',
  styleUrls: ['./match-add.component.css']
})
export class MatchAddComponent {
  public addMatchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matchService: MatchService,
  ) {
    this.addMatchForm = this.fb.group({
      player1name: ['', Validators.required],
      player1score: ['', Validators.min(0)],
      player2name: ['', Validators.required],
      player2score: ['', Validators.min(0)],
    });
  }

  onSubmit() {
    if (!this.addMatchForm.valid) {
      throw new Error('mispoes!');
    }
    this.matchService.add(
      this.addMatchForm.value
    );
  }
}
