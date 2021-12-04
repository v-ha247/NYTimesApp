import { TestBed } from '@angular/core/testing';

import { NYTimesAPIService } from './nytimes-api.service';

describe('NYTimesAPIService', () => {
  let service: NYTimesAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NYTimesAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
