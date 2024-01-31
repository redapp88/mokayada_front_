import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUpdateProposalComponent } from './users-update-proposal.component';

describe('UsersUpdateProposalComponent', () => {
  let component: UsersUpdateProposalComponent;
  let fixture: ComponentFixture<UsersUpdateProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersUpdateProposalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersUpdateProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
