import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { BASE_URL } from '../../enviornment/enviornment';

interface Doctor {
  name: string;
  speciality: string;
  registrationNumber: string;
  email: string;
  phoneNumber: string;
}

interface Appointment {
  name: string;
  gender: string;
  age: number;
  phoneNumber: string;
  doctorName: string;
  speciality: string;
  date: string;
  time: string;
  status: string;
  id?: string;
  doctorId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookAppointmentService {
  constructor(private http: HttpClient) {}

  getDoctors(specialty?: string, registrationNumber?: string): Observable<Doctor[]> {
    let params = new HttpParams();

    if (specialty) {
      params = params.set('specialty', specialty);
    }

    if (registrationNumber) {
      params = params.set('registrationNumber', registrationNumber);
    }

    return this.http.get<Doctor[]>(`${BASE_URL}doctors/getDoctors`, { params });
  }

  getDoctorByRegistrationNumber(registrationNumber: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${BASE_URL}doctors/getDoctors`, {
      params: { registrationNumber },
    });
  }

  getDoctorsBySpecialty(specialty: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${BASE_URL}doctors/getDoctors`, {
      params: { specialty },
    });
  }

  bookAppointment(appointmentData: any): Observable<any> {
    return this.http.post(`${BASE_URL}appointments/bookAppointment`, appointmentData).pipe(
      catchError((error) => {
        console.error('Error in booking appointment:', error);
        return throwError(() => new Error('Failed to book appointment'));
      })
    );
  }

  getAppointmentsByPatientId(patientId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${BASE_URL}upcomingAppointments`, {
      params: { patientId },
    });
  }

  cancelAppointment(appointmentId: string): Observable<any> {
    return this.http
      .put(
        `${BASE_URL}cancel`,
        {},
        {
          // empty body
          params: { appointmentId },
        }
      )
      .pipe(
        catchError((error) => {
          console.error('Error cancelling appointment:', error);
          return throwError(() => new Error('Failed to cancel appointment'));
        })
      );
  }

  getPreviousAppointmentsByPatientId(patientId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${BASE_URL}previous`, {
      params: { patientId },
    });
  }
  getConsultations(registrationNumber: string,appointmentId:string): Observable<any> {
    return this.http.get<any>(`${BASE_URL}consultations/appointment`, {
      params: { registrationNumber,appointmentId },
    });
  }
  getPreviousConsultations(appointmentId: string): Observable<any> {
    return this.http.get<any>(`${BASE_URL}previousConsultation`, {
      params: { appointmentId },
    });
  }

downloadConsultation(appointmentId: string): Observable<Blob> {
  const url = `${BASE_URL}downloadConsultation?appointmentId=${appointmentId}`;
  return this.http.get(url, { responseType: 'blob' });
}

}
