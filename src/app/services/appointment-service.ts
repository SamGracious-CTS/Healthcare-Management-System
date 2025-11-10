// 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../Model/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:5000/appointments';

  constructor(private http: HttpClient) {}
bookAppointment(appointment: Appointment) {
    return this.http.post('http://localhost:5000/appointments/bookAppointment', appointment);
  }
  // ✅ Book a new appointment
  // bookAppointment(appointment: Appointment): Observable<Appointment> {
  //   return this.http.post<Appointment>(`${this.baseUrl}/bookAppointment`, appointment);
  // }

  // ✅ Get all appointments
  // getAllAppointments(): Observable<Appointment[]> {
  //   return this.http.get<Appointment[]>(`${this.baseUrl}`);
  // }

  // ✅ Get previous appointments by patientId
  getPreviousAppointments(patientId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`http://localhost:5000/previous/${patientId}`);
  }

  // ✅ Get upcoming appointments by patientId
  getUpcomingAppointments(patientId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/patient/${patientId}/upcoming`);
  }

  // ✅ Update an appointment (e.g., reschedule)
  updateAppointment(appointmentId: string, updatedData: Partial<Appointment>): Observable<Appointment> {
    return this.http.put<Appointment>(`http://localhost:5000/update/${appointmentId}`, updatedData);
  }

  // ✅ Cancel an appointment (status change only)
  cancelAppointment(appointmentId: string): Observable<Appointment> {
    return this.http.patch<Appointment>(`http://localhost:5000/cancel/${appointmentId}`, { status: 'canceled' });
  }
}
