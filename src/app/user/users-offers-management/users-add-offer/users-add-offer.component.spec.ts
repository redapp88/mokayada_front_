import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAddOfferComponent } from './users-add-offer.component';

describe('UsersAddOfferComponent', () => {
  let component: UsersAddOfferComponent;
  let fixture: ComponentFixture<UsersAddOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAddOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersAddOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
