import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../enviornment/enviornment';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class ConsultationApiService {
  constructor(private http: HttpClient, private authservice: AuthService) {}

  getConsultations(): Observable<any> {
    const registrationNumber = this.authservice.getDoctorId();
    const url = `${BASE_URL}consultations/getAppointments?registrationNumber=${registrationNumber}`;
    return this.http.get<any>(url);
  }
  createConsultation(payload: any): Observable<any> {
    const url = `${BASE_URL}consultations/createConsultation`;
    return this.http.post<any>(url, payload);
  }
    getConsultationHistory(): Observable<any> {
    const registrationNumber = this.authservice.getDoctorId();
    const url = `${BASE_URL}consultations/consultationHistory?registrationNumber=${registrationNumber}`;
    return this.http.get<any>(url);
  }
}
