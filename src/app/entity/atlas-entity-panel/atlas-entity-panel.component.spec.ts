import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasEntityPanelComponent } from './atlas-entity-panel.component';

describe('AtlasEntityPanelComponent', () => {
  let component: AtlasEntityPanelComponent;
  let fixture: ComponentFixture<AtlasEntityPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlasEntityPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasEntityPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
