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
})
export class UpcomingAppointments {
   

appointments: Patients[] = [];
 


  constructor(private appointmentService: AppointmentService) {}

 ngOnInit(): void {
    this.loadAppointments();
  }
 
  loadAppointments(): void {
    this.appointments = this.appointmentService.getAppointments();
  }
 
    cancelAppointments(patient: Patients): void {
  this.appointmentService.updateAppointment(patient);
  this.loadAppointments(); 
}
  

}


