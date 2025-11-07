import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment-service';
import { PatientAppointment } from '../../../Model/patient-appointment.model';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './book-appointment.html',
  styleUrls: ['./book-appointment.css']
})
export class BookAppointment {
  apptform: any;
  constructor(private appointmentService: AppointmentService) {}

  patient: PatientAppointment = {
    name: '',
    gender: '',
    age: 0,
    phoneNumber: '',
    doctorName: '',
    speciality: '',
    date: '',
    time: '',
    status: 'Confirmed'
  };

  specialties = ['Cardiologist', 'Neurologist', 'Dermatologist'];

  doctorMap: { [key: string]: string[] } = {
    Cardiologist: ['Navya', 'Sam', 'Sohit'],
    Neurologist: ['Rasgna', 'Vikas'],
    Dermatologist: ['Preethi', 'Krishna', 'Robin']
  };

  availableDoctors: string[] = [];

  onSpecialtyChange(): void {
    this.availableDoctors = this.doctorMap[this.patient.speciality] || [];
    this.patient.doctorName = '';
  }

  timeSlots: string[] = [];
  showSlots = false;
  form: any;

  onDateChange() {
    this.showSlots = true;
    this.timeSlots = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'];
  }

  selectSlot(slot: string) {
    this.patient.time = slot;
  }

  todayString = new Date().toISOString().split('T')[0];
  submit = false;

  bookAppointment(form: NgForm) {
    if (form.valid) {
      this.appointmentService.bookedAppointment(this.patient);
      this.submit = true;
      this.patient.time = '';
      this.showSlots = false;
      form.resetForm();
    } else {
      this.submit = false;
    }
  }
}
