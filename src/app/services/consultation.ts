// // import { Injectable } from '@angular/core';
// // import { ConsultationRecord, Patient } from '../Model/consultationRecord';
// // import { AppointmentService } from './appointment-service'; // adjust path as needed

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class Consultation {
// //   private consultations: ConsultationRecord[] = [];

// //   constructor(private appointmentService: AppointmentService) {}

// //   getPatients(): Patient[] {
// //     // Convert Patients from AppointmentService into Patient format
// //     const booked = this.appointmentService.getAppointments();
// //     return booked.map(p => ({
// //       id: p.id,
// //       age: p.age,
// //       name: p.name,
// //       phoneNumber: p.phoneNumber
// //     }));
// //   }

// //   getConsultations(): ConsultationRecord[] {
// //     return this.consultations;
// //   }

// //   addConsultation(record: ConsultationRecord): void {
// //     this.consultations.push(record);
// //   }
// // }


// // consultation.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { ConsultationRecord, Patient } from '../Model/consultationRecord';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class Consultation {
//   private apiUrl = 'http://localhost:3000/consultation'; // adjust if needed

//   constructor(private http: HttpClient) {}

//   getConsultations(registrationNumber: string): Observable<ConsultationRecord[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/getConsultations?registrationNumber=${registrationNumber}`)
//       .pipe(
//         map(appointments => appointments.map(app => ({
//           consultationId: app.consultationId || '',
//           patientId: app.patientId._id,
//           patientName: app.patientId.name,
//           doctorId: app.registrationNumber,
//           appointmentId: app._id,
//           date: app.date.split('T')[0],
//           notes: '',
//           prescription: ''
//         })))
//       );
//   }
// }
