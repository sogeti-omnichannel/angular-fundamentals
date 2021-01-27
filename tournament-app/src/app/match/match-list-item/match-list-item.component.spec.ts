import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchListItemComponent } from './match-list-item.component';

describe('MatchListItemComponent', () => {
  let component: MatchListItemComponent;
  let fixture: ComponentFixture<MatchListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
