import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Op650Component } from './op650.component';

describe('Op650Component', () => {
  let component: Op650Component;
  let fixture: ComponentFixture<Op650Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Op650Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Op650Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
