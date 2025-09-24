import { EventEmitter, Injectable } from '@angular/core';
import { Patients } from '../Model/appointment';




@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
private storageKey = 'appointments';
  // Save a new appointment
  bookedAppointment(patient: Patients): Patients[] {
    const appointments = this.getAppointments();
    appointments.push(patient);
    localStorage.setItem(this.storageKey, JSON.stringify(appointments));
    return appointments;
  }

  // Retrieve all appointments
  getAppointments(): Patients[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  
  
  removeAppointment(patient: Patients): void {
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
