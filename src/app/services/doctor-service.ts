import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private baseUrl = 'http://localhost:5000/doctors';
  doctors: any;

  constructor(private http: HttpClient) {}

  getDoctorsBySpecialty(specialty: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?specialty=${specialty}`);
  }

  getDoctorSlots(doctorId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/getSlots/${doctorId}`);
  }

 addDoctor(doctorData: any, speciality: any) {
    return this.http.post('http://localhost:3000/doctors', doctorData);
  }

  
}

