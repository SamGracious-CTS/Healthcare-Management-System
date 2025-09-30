import { TestBed } from '@angular/core/testing';

import { AppointmentService } from './appointment-service';

describe('AppointmentService', () => {
  let service: AppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate unique patient IDs dynamically', () => {
    const id1 = service.getNextPatientId();
    const id2 = service.getNextPatientId();
    expect(id1).not.toBe(id2);
    expect(id1.length).toBe(4);
    expect(id2.length).toBe(4);
  });

});
