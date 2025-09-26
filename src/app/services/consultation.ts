import { Injectable } from '@angular/core';
import { ConsultationRecord, Patient } from '../Model/consultationRecord';
import { AppointmentService } from './appointment-service'; // adjust path as needed

@Injectable({
  providedIn: 'root'
})
export class Consultation {
  private consultations: ConsultationRecord[] = [];

  constructor(private appointmentService: AppointmentService) {}

  getPatients(): Patient[] {
    // Convert Patients from AppointmentService into Patient format
    const booked = this.appointmentService.getAppointments();
    return booked.map(p => ({
      id: p.id,
      age: p.age,
      name: p.name,
      phoneNumber: p.phoneNumber
    }));
  }

  getConsultations(): ConsultationRecord[] {
    return this.consultations;
  }

  addConsultation(record: ConsultationRecord): void {
    this.consultations.push(record);
  }
}
