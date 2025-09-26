import { Injectable } from '@angular/core';
import { Patients } from '../Model/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointments: Patients[] = [];

  private patientCounter = 1;
  private doctorCounter = 1;

getNextPatientId(): string {
  const id = this.patientCounter;
  this.patientCounter++;
  return id.toString().padStart(4, '0');
}

getNextDoctorId(): string {
  const id = this.doctorCounter;
  this.doctorCounter++;
  return id.toString().padStart(4, '0');
}

  bookedAppointment(patient: Patients): Patients[] {
    this.appointments.push(patient);
    return this.appointments;
  }

  getAppointments(): Patients[] {
    return this.appointments;
  }

  removeAppointment(patient: Patients): void {
    this.appointments = this.appointments.filter(app =>
      !(app.name === patient.name &&
        app.phoneNumber === patient.phoneNumber &&
        app.date === patient.date &&
        app.time === patient.time)
    );
  }
}
