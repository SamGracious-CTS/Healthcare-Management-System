import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Appointment, Patients } from '../../../Model/appointment';
import { AppointmentService } from '../../../services/appointment-service';
import { DoctorService } from '../../../services/doctor-service';

declare var bootstrap: any;

@Component({
  selector: 'app-book-appointment',
  imports: [FormsModule, CommonModule],
  templateUrl: './book-appointment.html',
  styleUrl: './book-appointment.css',
})
export class BookAppointment implements OnInit {
  apptform: any;
  constructor(private appointmentService: AppointmentService, private doctorService: DoctorService) {}

  patient: Partial<Patients> = {
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

  doctorMap: { [key: string]: string[] } = {};

  availableDoctors: string[] = [];

  onSpecialtyChange(): void {
    const specialty = this.patient.speciality;
    this.availableDoctors = specialty ? this.doctorMap[specialty] || [] : [];
    this.patient.doctorName = '';
  }

  timeSlots: string[] = [];
  showSlots = false;
  form: any;
  todayString = new Date().toISOString().split('T')[0];
  submit = false;

  onDateChange() {
    this.showSlots = true;
    this.timeSlots = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'];
  }

  selectSlot(slot: string) {
    this.patient.time = slot;
  }

  bookAppointment(form: NgForm) {
    if (form.valid) {
      const paddedPatientId = 'P' + this.appointmentService.getNextPatientId();
      const paddedDoctorId = 'D_' + this.patient.doctorName;

      const bookedPatient = {
        ...this.patient,
        id: paddedPatientId,
        doctorId: paddedDoctorId
      } as Patients;

      this.appointmentService.bookedAppointment(bookedPatient);
      this.submit = true;
      this.patient.time = '';
      this.showSlots = false;
      form.resetForm();
    } else {
      this.submit = false;
    }
  }

  ngOnInit() {
    this.doctorMap = this.doctorService.getDoctors();
  }
}
