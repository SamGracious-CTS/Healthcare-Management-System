import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeSlots {
  constructor(private httpClient: HttpClient) {}

  private GET_SLOTS_URL = 'http://localhost:5000/doctors/getSlots/690877343b1efccfe3aadf90'
  private CREATE_SLOT_URL = 'http://localhost:5000/doctors/createSlot/690877343b1efccfe3aadf90'
  private DELETE_SLOT_URL = 'http://localhost:5000/doctors/deleteSlot/690877343b1efccfe3aadf90'

  getTimeSlots():Observable<any> {
    console.log('Fetching time slots from backend...');
    return this.httpClient.get<any>(this.GET_SLOTS_URL);
  }


  createTimeSlot(payload: { calendar: { date: string; availableSlots: { startTime: string; endTime: string }[] }[] }): Observable<any> {
    console.log('Sending create Time Slot payload to backend:', payload);
    return this.httpClient.put<any>(this.CREATE_SLOT_URL, payload).pipe(
      retry(1),
      catchError((error) => {
        console.error("Error creating Time Slot", error);
        return throwError(() => new Error("Failed to create Time Slot"));
      })
    )
  }

  deleteTimeSlot(payload:any){
    console.log('Deleting Time Slot with payload:', payload);
     return this.httpClient.put<any>(this.DELETE_SLOT_URL, payload).pipe(
      retry(1),
      catchError((error) => {
        console.error("Error deleting Time Slot", error);
        return throwError(() => new Error("Failed to delete Time Slot"));
      })
    )

  }

}
