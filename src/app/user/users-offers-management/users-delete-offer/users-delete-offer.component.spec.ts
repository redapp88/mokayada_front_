import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDeleteOfferComponent } from './users-delete-offer.component';

describe('UsersDeleteOfferComponent', () => {
  let component: UsersDeleteOfferComponent;
  let fixture: ComponentFixture<UsersDeleteOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersDeleteOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersDeleteOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
