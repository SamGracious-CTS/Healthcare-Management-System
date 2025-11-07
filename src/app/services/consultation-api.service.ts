import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../Model/patient.model';
import { ConsultationRecord } from '../Model/consultation-record.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationApiService {
  private baseUrl = 'http://localhost:3000/consultations';

  private patients: Patient[] = [];
  private consultationRecords: ConsultationRecord[] = [];

  constructor(private http: HttpClient) {}

  // API calls
  getAppointmentsByDoctor(doctorId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${doctorId}`);
  }

  createConsultation(
    doctorId: string,
    appointmentId: string,
    body: { notes: string; prescription: string }
  ): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/${doctorId}/${appointmentId}/consultation`,
      body
    );
  }

  // Local state methods
  addPatient(patient: Patient): void {
    this.patients.push(patient);
  }

  getPatients(): Patient[] {
    return this.patients;
  }

  addConsultation(record: ConsultationRecord): void {
    this.consultationRecords.push(record);
  }

  getConsultations(): ConsultationRecord[] {
    return this.consultationRecords;
  }

  getPatientConsultations(patientId: string): ConsultationRecord[] {
    return this.consultationRecords.filter(r => r.patientId === patientId);
  }
}
