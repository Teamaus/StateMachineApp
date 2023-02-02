import { TestBed } from '@angular/core/testing';

import { MOSTSnapshotService } from './mostsnapshot.service';

describe('MOSTSnapshotService', () => {
  let service: MOSTSnapshotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MOSTSnapshotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
