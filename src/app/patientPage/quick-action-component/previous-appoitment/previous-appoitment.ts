import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookAppointmentService } from '../../../services/book-appointment-service';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-previous-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './previous-appoitment.html',
  styleUrls: ['./previous-appoitment.css'],
})
export class PreviousAppointment implements OnInit {
  appointments: any[] = [];
  selectedAppointment: any = null;
  showModal: boolean = false;
  filteredAppointments: any[] = [];
  errorMessage : string = '';

  constructor(
    private appointmentService: BookAppointmentService,
    private authServie: AuthService
  ) {}

  ngOnInit(): void {
    this.getPreviousAppointments();
  }

  openModal(appt: any): void {
    console.log('Opening modal for:', appt);
    this.selectedAppointment = appt;
    this.showModal = true;

    if (appt?._id) {
      this.appointmentService.getPreviousConsultations(appt._id).subscribe({
        next: (consultation) => {
          this.selectedAppointment.consultation = consultation;
        },
        error: (err) => {
          console.error('Failed to load consultation details:', err);
        },
      });
    }
  }

  closeModal(): void {
    this.selectedAppointment = null;
    this.showModal = false;
  }
  getPreviousAppointments() {
    const patientId = this.authServie.getUserId();
    if (patientId) {
      this.appointmentService.getPreviousAppointmentsByPatientId(patientId).subscribe(
        (data) => {
          if (!data){
            this.errorMessage = "No previous appointments found.";
            return;
          }else{
          this.appointments = data;
          this.filteredAppointments = data;
          }
        },
        (error) => {
          console.error('Error fetching previous appointments:', error);
        }
      );
    }
  }
  filterAppointments(type: string): void {
    const today = new Date();
    this.errorMessage = '';
    if (type === 'cancelled') {
      this.filteredAppointments = this.appointments.filter((appt) => appt.status === 'cancelled');
      if (this.filteredAppointments.length === 0) {
        this.errorMessage = "There are no cancelled appointments.";
      }
    } else if (type === 'completed') {
      this.filteredAppointments = this.appointments.filter((appt) => appt.status === 'completed');
      if (this.filteredAppointments.length === 0) {
        this.errorMessage = "There are no completed appointments.";
      }
    // } else if (type === 'recent') {
    //   this.filteredAppointments = this.appointments.filter((appt) => {
    //     const apptDate = new Date(appt.date);
    //     const diffDays = (today.getTime() - apptDate.getTime()) / (1000 * 3600 * 24);
    //     return appt.status === 'completed' && diffDays <= 7;
    //   });
    } else {
      this.filteredAppointments = this.appointments;
       if (this.filteredAppointments.length === 0) {
      this.errorMessage = "No previous appointments found.";
    }
    }
  }
  onFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target?.value || 'all'; // fallback to 'all' if null
    this.filterAppointments(selectedValue);
  }
  download() {
    this.appointmentService.downloadConsultation(this.selectedAppointment._id).subscribe((fileBlob) => {
      const url = window.URL.createObjectURL(fileBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'consultation.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
}
