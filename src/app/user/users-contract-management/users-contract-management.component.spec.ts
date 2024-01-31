import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersContractManagementComponent } from './users-contract-management.component';

describe('UsersContractManagementComponent', () => {
  let component: UsersContractManagementComponent;
  let fixture: ComponentFixture<UsersContractManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersContractManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersContractManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
