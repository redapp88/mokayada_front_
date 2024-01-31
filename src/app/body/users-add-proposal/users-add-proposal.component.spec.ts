import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAddProposalComponent } from './users-add-proposal.component';

describe('UsersAddProposalComponent', () => {
  let component: UsersAddProposalComponent;
  let fixture: ComponentFixture<UsersAddProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAddProposalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersAddProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
