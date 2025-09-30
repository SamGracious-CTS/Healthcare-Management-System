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
 
  constructor(private appointment: Appointment) {}
 
  ngOnInit(): void {
    this.appointments = this.appointment.getAppointments();
  }
 
  openModal(appt: any): void {
    console.log('Opening modal for:', appt); // ✅ Debug log
    this.selectedAppointment = appt;
    this.showModal = true;
  }
 
  closeModal(): void {
    this.selectedAppointment = null;
    this.showModal = false;
  }
}
