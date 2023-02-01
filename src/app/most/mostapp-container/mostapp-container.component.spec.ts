import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MOSTAppContainerComponent } from './mostapp-container.component';

describe('MOSTAppContainerComponent', () => {
  let component: MOSTAppContainerComponent;
  let fixture: ComponentFixture<MOSTAppContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MOSTAppContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MOSTAppContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
