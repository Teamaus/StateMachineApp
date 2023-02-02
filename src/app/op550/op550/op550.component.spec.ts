import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Op550Component } from './op550.component';

describe('Op550Component', () => {
  let component: Op550Component;
  let fixture: ComponentFixture<Op550Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Op550Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Op550Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
