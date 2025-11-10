

// import { Component, OnInit } from '@angular/core';
// import { Appointment } from '../../../services/appointment';
// import { CommonModule } from '@angular/common';
// import { AppointmentService } from '../../../services/appointment-service';
 
// @Component({
//   selector: 'app-previous-appointment',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './previous-appoitment.html',
//   styleUrls: ['./previous-appoitment.css']
// })
// export class PreviousAppointment implements OnInit {
//   appointments: any[] = [];
//   selectedAppointment: any = null;
//   showModal: boolean = false;
 
//   constructor(private appointment: AppointmentService) {}
 
  
//     ngOnInit(): void {
//   const patientId = '69102e40f2bca147c7e23636'; // You can dynamically get this from route or auth later

//   this.appointment.getPreviousAppointments(patientId).subscribe({
//     next: (data) => {
//       this.appointments = data;
//       console.log('Fetched appointments:', data);
//     },
//     error: (err) => {
//       console.error('Error fetching appointments:', err);
//     }
//   });
// }
  
 
//   openModal(appt: any): void {
//     console.log('Opening modal for:', appt); // ✅ Debug log
//     this.selectedAppointment = appt;
//     this.showModal = true;
//   }
 
//   closeModal(): void {
//     this.selectedAppointment = null;
//     this.showModal = false;
//   }
// }


import { Component, Input, OnInit } from "@angular/core";
import { AppointmentService } from "../../../services/appointment-service";
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-previous-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './previous-appointment.html',
  styleUrl: './previous-appointment.css',
})
export class PreviousAppointment implements OnInit {
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  selectedAppointment: any = null;
  showModal: boolean = false;
  @Input() patientId!: string
  constructor(private appointment: AppointmentService) {}

  ngOnInit(): void {
    // const patientId = '69102e40f2bca147c7e23636'; // Replace with dynamic ID later
     if (this.patientId) {
    this.appointment.getPreviousAppointments(this.patientId).subscribe({
      next: (data) => {
        this.appointments = data;
        this.filteredAppointments = data; // default view
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
      }
    });
  }
  

  }
  filterAppointments(type: string): void {
    const today = new Date();
    if (type === 'cancelled') {
      this.filteredAppointments = this.appointments.filter(appt => appt.status === 'cancelled');
    } else if (type === 'completed') {
      this.filteredAppointments = this.appointments.filter(appt => appt.status === 'completed');
    } else if (type === 'recent') {
      this.filteredAppointments = this.appointments.filter(appt => {
        const apptDate = new Date(appt.date);
        const diffDays = (today.getTime() - apptDate.getTime()) / (1000 * 3600 * 24);
        return appt.status === 'completed' && diffDays <= 7;
      });
    } else {
      this.filteredAppointments = this.appointments;
    }
  
  }
   onFilterChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const selectedValue = target?.value || 'all'; // fallback to 'all' if null
  this.filterAppointments(selectedValue);
}
   
  openModal(appt: any): void {
    this.selectedAppointment = appt;
    this.showModal = true;
  }

  closeModal(): void {
    this.selectedAppointment = null;
    this.showModal = false;
  }
}

  
 


 