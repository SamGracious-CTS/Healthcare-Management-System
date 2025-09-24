import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Appointment {
  private appointmentObj = [
    {
      date: '15-09-2025',
      doctorName: 'Venkat',
      status: 'Completed',
      specialty: 'Gynecology'
    },
    {
      date: '13-09-2025',
      doctorName: 'Robin',
      status: 'Completed',
      diagnosis: '',
      notes: 'hii',
      specialty: 'Dermatology'
    },
    {
      date: '25-09-2025',
      doctorName: 'David',
      status: 'Not Completed',
      specialty: 'Neurology'
    },
    {
      date: '11-09-2025',
      doctorName: 'David',
      status: 'Completed',
      specialty: 'Neurology'
    },

     {
      date: '11-09-2025',
      doctorName: 'Kashinath',
      status: 'Completed',
      specialty: 'Neurology'
    },

     {
      date: '11-09-2025',
      doctorName: 'Robin',
      status: 'Completed',
      specialty: 'Neurology'
    }
  ];

  constructor() {}

  getAppointments(): any[] {
    return this.appointmentObj.filter(appt => appt.status === 'Completed');
  }
}
