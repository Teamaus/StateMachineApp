import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExpressionsComponent } from './test-expressions.component';

describe('TestExpressionsComponent', () => {
  let component: TestExpressionsComponent;
  let fixture: ComponentFixture<TestExpressionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestExpressionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestExpressionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
