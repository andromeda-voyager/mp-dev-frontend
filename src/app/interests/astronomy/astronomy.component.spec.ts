import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AstronomyComponent } from './astronomy.component';

describe('AstronomyComponent', () => {
  let component: AstronomyComponent;
  let fixture: ComponentFixture<AstronomyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AstronomyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstronomyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
