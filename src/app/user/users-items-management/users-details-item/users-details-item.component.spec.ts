import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDetailsItemComponent } from './users-details-item.component';

describe('UsersDetailsItemComponent', () => {
  let component: UsersDetailsItemComponent;
  let fixture: ComponentFixture<UsersDetailsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersDetailsItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersDetailsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
