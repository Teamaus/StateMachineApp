import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOp650Component } from './test-op650.component';

describe('TestOp650Component', () => {
  let component: TestOp650Component;
  let fixture: ComponentFixture<TestOp650Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestOp650Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestOp650Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
