import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecommendedComponent } from './recommended.component';

describe('RecommendedComponent', () => {
  let component: RecommendedComponent;
  let fixture: ComponentFixture<RecommendedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
