import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOfferProposalAcceptComponent } from './users-offer-proposal-accept.component';

describe('UsersOfferProposalAcceptComponent', () => {
  let component: UsersOfferProposalAcceptComponent;
  let fixture: ComponentFixture<UsersOfferProposalAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersOfferProposalAcceptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersOfferProposalAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
