import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendBooksComponent } from './recommend-books.component';

describe('RecommendBooksComponent', () => {
  let component: RecommendBooksComponent;
  let fixture: ComponentFixture<RecommendBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
