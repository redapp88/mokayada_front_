import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOffersManagementComponent } from './users-offers-management.component';

describe('UsersOffersManagementComponent', () => {
  let component: UsersOffersManagementComponent;
  let fixture: ComponentFixture<UsersOffersManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersOffersManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersOffersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
