import { TestBed } from '@angular/core/testing';

import { ServiceCallsService } from './service-calls.service';

describe('ServiceCallsService', () => {
  let service: ServiceCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
