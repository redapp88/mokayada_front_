import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDeleteItemComponent } from './users-delete-item.component';

describe('UsersDeleteItemComponent', () => {
  let component: UsersDeleteItemComponent;
  let fixture: ComponentFixture<UsersDeleteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersDeleteItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersDeleteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
