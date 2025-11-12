import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookAppointmentService } from '../../services/book-appointment-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-upcoming-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upcoming-appointments.html',
  styleUrls: ['./upcoming-appointments.css'],
})
export class UpcomingAppointments implements OnInit {
  appointments: any[] = [];
  errorMessage: string = '';

  constructor(
    private bookAppointmentService: BookAppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAppointments();
  }

  cancelAppointments(appointment: any): void {
    if (!appointment?.id) return;
    if (!confirm('Are you sure you want to cancel this appointment?')) return;

    this.bookAppointmentService.cancelAppointment(appointment.id).subscribe({
      next: () => {
        // refresh list
        this.getAppointments();
      },
      error: (error) => {
        console.error('Error cancelling appointment:', error);
        alert('Failed to cancel appointment.');
      }
    });
  }

  getAppointments() {
    const patientId = this.authService.getUserId();
    if (patientId) {
      this.bookAppointmentService.getAppointmentsByPatientId(patientId).subscribe({
        next: (appointments) => {
          if (!appointments || appointments.length === 0) {
          this.errorMessage = "Sorry, There are no upcoming appointments!";
          this.appointments = [];
          return;
        }else{
          this.errorMessage = '';
          this.appointments = appointments;
        }
        },
        error: (error) => {
          console.error('Error fetching appointments:', error);
        },
      });
    }
  }
}
