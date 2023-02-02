import { TestBed } from '@angular/core/testing';

import { MOSTComponentService } from './mostcomponent.service';

describe('MOSTComponentService', () => {
  let service: MOSTComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MOSTComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
