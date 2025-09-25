import { TestBed } from '@angular/core/testing';

import { Availability } from './availability';

describe('Availability', () => {
  let service: Availability;

  beforeEach(() => {
   service = new Availability();
  });


 it('should create the service', () => {
    expect(service).toBeTruthy();
  });


it('should add a slot', () => {
    const payload = {
      '2025-09-25': [{ startTime: '09:00', endTime: '10:00' }]
    };

    service.addSlot(payload);
    const slots = service.getSavedSlots();

    expect(slots['2025-09-25'].length).toBe(1);
    expect(slots['2025-09-25'][0].startTime).toBe('09:00');
  });





});
