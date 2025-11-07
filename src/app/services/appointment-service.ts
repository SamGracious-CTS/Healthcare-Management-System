import { Injectable } from '@angular/core';
import { PatientAppointment } from '../Model/patient-appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private storageKey = 'appointments';

  bookedAppointment(patient: PatientAppointment): PatientAppointment[] {
    const appointments = this.getAppointments();
    appointments.push(patient);
    localStorage.setItem(this.storageKey, JSON.stringify(appointments));
    return appointments;
  }

  getAppointments(): PatientAppointment[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  removeAppointment(patient: PatientAppointment): void {
    const appointments = this.getAppointments();
    const updated = appointments.filter(app =>
      !(app.name === patient.name &&
        app.phoneNumber === patient.phoneNumber &&
        app.date === patient.date &&
        app.time === patient.time)
    );
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
  }
}
