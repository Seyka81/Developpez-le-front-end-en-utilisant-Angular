import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxInformationComponent } from './box-information.component';

describe('BoxInformationComponent', () => {
  let component: BoxInformationComponent;
  let fixture: ComponentFixture<BoxInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
