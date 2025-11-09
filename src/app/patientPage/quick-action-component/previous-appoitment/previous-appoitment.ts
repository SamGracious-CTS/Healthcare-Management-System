// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { Appointment } from '../../../services/appointment';


// @Component({
//   selector: 'app-previous-appoitment',
//   imports: [CommonModule],
//   templateUrl: './previous-appoitment.html',
//   styleUrl: './previous-appoitment.css'
// })
// export class PreviousAppoitment {
// appointments: any[] = [];
//   constructor(private appointment: Appointment) {}

//   ngOnInit(): void {
//     this.appointments = this.appointment.getAppointments();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../services/appointment';
import { CommonModule } from '@angular/common';
import { BookAppointmentService } from '../../../services/book-appointment-service';

@Component({
  selector: 'app-previous-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './previous-appoitment.html',
  styleUrls: ['./previous-appoitment.css']
})
export class PreviousAppointment implements OnInit {
  appointments: any[] = [];
  selectedAppointment: any = null;
  showModal: boolean = false;

  constructor(private appointment: Appointment,
    private appointmentService: BookAppointmentService
  ) {}

  ngOnInit(): void {
    // this.appointments = this.appointment.getAppointments();
    this.getPreviousAppointments();
  }

  openModal(appt: any): void {
    console.log('Opening modal for:', appt);
    this.selectedAppointment = appt;
    this.showModal = true;

    // fetch consultation details and attach to selectedAppointment
    if (appt?.registrationNumber && appt?.id) {
      this.appointmentService.getConsultations(appt.registrationNumber, appt.id).subscribe({
        next: (consultation) => {
          this.selectedAppointment.consultation = consultation;
        },
        error: (err) => {
          console.error('Failed to load consultation details:', err);
        }
      });
    }
  }

  closeModal(): void {
    this.selectedAppointment = null;
    this.showModal = false;
  }
  getPreviousAppointments() {
    const patientId = localStorage.getItem('userId');
    if (patientId) {
      this.appointmentService.getPreviousAppointmentsByPatientId(patientId).subscribe(
        (data) => {
          this.appointments = data;
        },
        (error) => {
          console.error('Error fetching previous appointments:', error);
        }
      );
    }
  }
}
