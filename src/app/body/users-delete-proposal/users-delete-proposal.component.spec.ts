import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDeleteProposalComponent } from './users-delete-proposal.component';

describe('UsersDeleteProposalComponent', () => {
  let component: UsersDeleteProposalComponent;
  let fixture: ComponentFixture<UsersDeleteProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersDeleteProposalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersDeleteProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
