import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOfferProposalsListComponent } from './users-offer-proposals-list.component';

describe('UsersOfferProposalsListComponent', () => {
  let component: UsersOfferProposalsListComponent;
  let fixture: ComponentFixture<UsersOfferProposalsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersOfferProposalsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersOfferProposalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
