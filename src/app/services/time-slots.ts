import { BASE_URL } from './../../enviornment/enviornment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class TimeSlots {
  constructor(
    private httpClient: HttpClient,
    private authservice: AuthService
  ) {}

  getTimeSlots(): Observable<any> {
    const doctorId = this.authservice.getDoctorId();
    console.log('Fetching time slots from backend...');
    return this.httpClient.get<any>(`${BASE_URL}doctors/getSlots/?registrationNumber=${doctorId}`);
  }

  createTimeSlot(payload: {
    calendar: { date: string; availableSlots: { startTime: string; endTime: string }[] }[];
  }): Observable<any> {
    const doctorId = this.authservice.getDoctorId();
    console.log('Sending create Time Slot payload to backend:', payload);
    return this.httpClient.put<any>(`${BASE_URL}doctors/createSlot/?registrationNumber=${doctorId}`, payload).pipe(
      retry(1),
      catchError((error) => {
        console.error('Error creating Time Slot', error);
        return throwError(() => new Error('Failed to create Time Slot'));
      })
    );
  }

  deleteTimeSlot(payload: any) {
    const doctorId = this.authservice.getDoctorId();
    console.log('Deleting Time Slot with payload:', payload);
    return this.httpClient.put<any>(`${BASE_URL}doctors/deleteSlot/?registrationNumber=${doctorId}`, payload).pipe(
      retry(1),
      catchError((error) => {
        console.error('Error deleting Time Slot', error);
        return throwError(() => new Error('Failed to delete Time Slot'));
      })
    );
  }

  timeSlots(payload: {
    calendar: { date: string; availableSlots: { startTime: string; endTime: string }[] }[];
  }): Observable<any> {
    const doctorId = this.authservice.getDoctorId();
    return this.httpClient.put<any>(`${BASE_URL}doctors/timeSlots/?registrationNumber=${doctorId}`, payload).pipe(
      retry(1),
      catchError((error) => {
        console.error('Error creating Time Slot', error);
        return throwError(() => new Error(`Failed to Create Time Slot`));
      })
    );
  }

  editTimeSlots(previousSlot: any, newSlot: any): Observable<any> {
    const doctorId = this.authservice.getDoctorId();
    const body = {
      previousSlot: previousSlot,
      newSlot: newSlot
    };
    return this.httpClient.put<any>(`${BASE_URL}doctors/editSlots/?registrationNumber=${doctorId}`, body);
  }
}
