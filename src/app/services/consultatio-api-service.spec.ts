import { TestBed } from '@angular/core/testing';

import { ConsultatioApiService } from './consultatio-api-service';

describe('ConsultatioApiService', () => {
  let service: ConsultatioApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultatioApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
