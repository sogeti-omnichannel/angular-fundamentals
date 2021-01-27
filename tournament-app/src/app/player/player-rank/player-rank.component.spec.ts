import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerRankComponent } from './player-rank.component';

describe('PlayerRankComponent', () => {
  let component: PlayerRankComponent;
  let fixture: ComponentFixture<PlayerRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerRankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
