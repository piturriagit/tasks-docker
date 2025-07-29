import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageIcon } from './image-icon';

describe('ImageIcon', () => {
  let component: ImageIcon;
  let fixture: ComponentFixture<ImageIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
