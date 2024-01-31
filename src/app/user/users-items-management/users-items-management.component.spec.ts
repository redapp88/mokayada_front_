import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersItemsManagementComponent } from './users-items-management.component';

describe('UsersItemsManagementComponent', () => {
  let component: UsersItemsManagementComponent;
  let fixture: ComponentFixture<UsersItemsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersItemsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersItemsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
