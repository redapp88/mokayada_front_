import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDetailsItemStaticComponent } from './users-details-item-static.component';

describe('UsersDetailsItemStaticComponent', () => {
  let component: UsersDetailsItemStaticComponent;
  let fixture: ComponentFixture<UsersDetailsItemStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersDetailsItemStaticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersDetailsItemStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
