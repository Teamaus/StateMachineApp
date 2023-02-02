import { TestBed } from '@angular/core/testing';

import { MOSTContainerService } from './mostcontainer.service';

describe('MOSTContainerService', () => {
  let service: MOSTContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MOSTContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
