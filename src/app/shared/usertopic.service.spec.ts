import { TestBed } from '@angular/core/testing';

import { UsertopicService } from './usertopic.service';

describe('UsertopicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsertopicService = TestBed.get(UsertopicService);
    expect(service).toBeTruthy();
  });
});
