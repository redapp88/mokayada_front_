import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersProposalManagementComponent } from './users-proposal-management.component';

describe('UsersProposalManagementComponent', () => {
  let component: UsersProposalManagementComponent;
  let fixture: ComponentFixture<UsersProposalManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersProposalManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersProposalManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
