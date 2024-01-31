import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageMaximizeComponent } from './image-maximize.component';

describe('ImageMaximizeComponent', () => {
  let component: ImageMaximizeComponent;
  let fixture: ComponentFixture<ImageMaximizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageMaximizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageMaximizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
