import { CommonModule } from '@angular/common';
import { Component, inject, OnInit} from '@angular/core';
//import { Appointment, Patients } from '../Model/appointment';
import { Appointment, Patients} from '../../Model/appointment';

//import { AppointmentService } from '../services/appointment-service';
import { AppointmentService } from '../../services/appointment-service';




@Component({
  selector: 'app-upcoming-appointments',
  imports: [CommonModule,],
  templateUrl: './upcoming-appointments.html',
  styleUrl: './upcoming-appointments.css',
  providers:[AppointmentService]
})
export class UpcomingAppointments {
   
  
//   appointments: Patients[] = [];
 

//   constructor(private appointmentService: AppointmentService) {}

//   ngOnInit() {
   
//     this.appointments = this.appointmentService.getAppointments();
//  }
//     cancelAppointments(patient: Patients): void {
     
//   this.appointmentService.removeAppointment(patient);
//   this.appointments = this.appointmentService.getAppointments(); 
// }

appointments: Patients[] = [];
  private lastData='';
  constructor(private appointmentService: AppointmentService) {}
 ngOnInit(): void {
    this.loadAppointments();
    setInterval(() => {
      const currentData = localStorage.getItem('appointments');
      if (currentData !== this.lastData) {
        this.lastData = currentData!;
        this.loadAppointments();
      }
    }, 2000);
  }
  loadAppointments(): void {
    this.appointments = this.appointmentService.getAppointments();
  }
 
    cancelAppointments(patient: Patients): void {    
  this.appointmentService.removeAppointment(patient);
  this.appointments = this.appointmentService.getAppointments();
}
  

}


