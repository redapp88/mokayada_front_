import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAddItemComponent } from './users-add-item.component';

describe('UsersAddItemComponent', () => {
  let component: UsersAddItemComponent;
  let fixture: ComponentFixture<UsersAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAddItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
