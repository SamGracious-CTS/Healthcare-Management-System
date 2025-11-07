import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment-service';
import { PatientAppointment } from '../../Model/patient-appointment.model';

@Component({
  selector: 'app-upcoming-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upcoming-appointments.html',
  styleUrls: ['./upcoming-appointments.css']
})
export class UpcomingAppointments implements OnInit {
  appointments: PatientAppointment[] = [];
  private lastData = '';

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

  cancelAppointments(patient: PatientAppointment): void {
    this.appointmentService.removeAppointment(patient);
    this.appointments = this.appointmentService.getAppointments();
  }
}
