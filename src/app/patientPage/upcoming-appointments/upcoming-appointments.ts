
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../Model/appointment.model';
import { AppointmentService } from '../../services/appointment-service';
import { DoctorService } from '../../services/doctor-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upcoming-appointments',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './upcoming-appointments.html',
  styleUrl: './upcoming-appointments.css',
})
export class UpcomingAppointments implements OnInit {
  appointments: Appointment[] = [];
  selectedAppointment: Appointment | null = null;
  updatedDate: string = '';
  updatedStartTime: string = '';
  updatedEndTime: string = '';
  editSlots: string[] = [];
  todayString = new Date().toISOString().split('T')[0];

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    const patientId = "69102e40f2bca147c7e23636"; // Replace with actual patient ID
    this.appointmentService.getUpcomingAppointments(patientId).subscribe((data) => {
      this.appointments = data;
    });
  }

  cancelAppointments(appt: Appointment): void {
    this.appointmentService.cancelAppointment(appt.id).subscribe(() => {
      this.loadAppointments();
    });
  }

  startEdit(appt: Appointment): void {
    this.selectedAppointment = { ...appt };
    this.updatedDate = appt.date;
    this.updatedStartTime = appt.startTime;
    this.updatedEndTime = appt.endTime;
    this.fetchSlots(appt.doctorId, appt.date);
  }

  onEditDateChange(): void {
    if (this.selectedAppointment) {
      this.fetchSlots(this.selectedAppointment.doctorId, this.updatedDate);
    }
  }

  fetchSlots(doctorId: string, date: string): void {
    this.doctorService.getDoctorSlots(doctorId).subscribe((slots) => {
      this.editSlots = slots.filter(slot => slot.includes(date)); // Adjust if backend returns date-filtered slots
    });
  }

  selectEditSlot(slot: string): void {
    const [start, end] = slot.split('-').map(s => s.trim());
    this.updatedStartTime = start;
    this.updatedEndTime = end;
  }

  saveEdit(): void {
    if (this.selectedAppointment) {
      const updatedData = {
        date: this.updatedDate,
        startTime: this.updatedStartTime,
        endTime: this.updatedEndTime
      };
      this.appointmentService.updateAppointment(this.selectedAppointment.id, updatedData).subscribe(() => {
        this.loadAppointments();
        this.selectedAppointment = null;
        this.editSlots = [];
      });
    }
  }
}






// import { CommonModule } from '@angular/common';
// import { Component, inject, OnInit} from '@angular/core';
//import { Appointment, Patients } from '../Model/appointment';
// import { Appointment, Patients} from '../../Model/appointment';

//import { AppointmentService } from '../services/appointment-service';
// import { AppointmentService } from '../../services/appointment-service';




// @Component({
//   selector: 'app-upcoming-appointments',
//   imports: [CommonModule,],
//   templateUrl: './upcoming-appointments.html',
//   styleUrl: './upcoming-appointments.css',
// })
// export class UpcomingAppointments {
   

// appointments: Patients[] = [];
 


//   constructor(private appointmentService: AppointmentService) {}
  

//  ngOnInit(): void {
//     this.loadAppointments();
//   }
 
//   loadAppointments(): void {
//     this.appointments = this.appointmentService.getAppointments();
//   }
 
//     cancelAppointments(patient: Patients): void {
//   this.appointmentService.updateAppointment(patient);
//   this.loadAppointments(); 
// }
  
// }



