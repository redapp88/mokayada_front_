import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersProposalOfferConcludedBoardComponent } from './users-proposal-offer-concluded-board.component';

describe('UsersProposalOfferConcludedBoardComponent', () => {
  let component: UsersProposalOfferConcludedBoardComponent;
  let fixture: ComponentFixture<UsersProposalOfferConcludedBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersProposalOfferConcludedBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersProposalOfferConcludedBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
