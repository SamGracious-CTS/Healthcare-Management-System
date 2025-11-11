import { TestBed } from '@angular/core/testing';

import { TimeSlots } from './time-slots';

describe('TimeSlots', () => {
  let service: TimeSlots;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeSlots);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
