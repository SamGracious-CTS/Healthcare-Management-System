import { TestBed } from '@angular/core/testing';

import { ConsultationApiService } from './consultation-api-service';

describe('ConsultationApiService', () => {
  let service: ConsultationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
