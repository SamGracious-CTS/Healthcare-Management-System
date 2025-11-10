import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Appointment } from '../../../Model/appointment.model';
import { AppointmentService } from '../../../services/appointment-service';
import { DoctorService } from '../../../services/doctor-service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './book-appointment.html',
  styleUrl: './book-appointment.css',
})
export class BookAppointment implements OnInit {
  @Output() bookingCompleted = new EventEmitter<void>();

  patient: Partial<Appointment> = {
    doctorName: '',
    speciality: '',
    date: '',
    startTime: '',
    endTime: '',
    status: 'confirmed'
  };

  specialties = ['Cardiologist', 'Neurologist', 'Dermatologist'];
  availableDoctors: { id: string, name: string }[] = [];
  timeSlots: string[] = [];
  showSlots = false;
  dateWarning = false;
  todayString = new Date().toISOString().split('T')[0];

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private http:HttpClient
  ) {}

  ngOnInit() {}

  onSpecialtyChange(): void {
    const specialty = this.patient.speciality;
    // if (specialty) {
    //   this.doctorService.getDoctorsBySpecialty(specialty).subscribe((doctors) => {
    //     this.availableDoctors = doctors;
    //     this.patient.doctorName = '';
    //   });
    // } 
    if (specialty) {
    // Dummy doctor data for testing
    const dummyDoctors: { [key: string]: { id: string, name: string }[] } = {
      Cardiologist: [
        { id: 'D001', name: 'Dr. Heartwell' },
        { id: 'D002', name: 'Dr. Pulse' }
      ],
      Neurologist: [
        { id: 'D003', name: 'Dr. Brainstorm' },
        { id: 'D004', name: 'Dr. Nerve' }
      ],
      Dermatologist: [
        { id: 'D005', name: 'Dr. Skinner' },
        { id: 'D006', name: 'Dr. Glow' }
      ]
    };

    this.availableDoctors = dummyDoctors[specialty] || [];
    this.patient.doctorName = '';
  }
    else {
      this.availableDoctors = [];
    }
  }

  onDateChange(): void {
    if (!this.patient.speciality || !this.patient.doctorName) {
      this.dateWarning = true;
      this.patient.date = '';
      this.showSlots = false;
    // } else {
    //   this.dateWarning = false;
    //   const doctorId = this.patient.doctorName!;
    //   this.doctorService.getDoctorSlots(doctorId).subscribe((slots) => {
    //     this.timeSlots = slots;
    //     this.showSlots = true;
    //   });
    }
    else {
    this.dateWarning = false;
    // Dummy time slots for testing
    this.timeSlots = [
      '9:00 AM - 10:00 AM',
      '10:30 AM - 11:30 AM',
      '2:00 PM - 3:00 PM',
      '3:30 PM - 4:30 PM'
    ];
    this.showSlots = true;
  }
  }

  selectSlot(slot: string): void {
    const [start, end] = slot.split('-').map(s => s.trim());
    this.patient.startTime = start;
    this.patient.endTime = end;
  }

  bookAppointment(form: NgForm): void {
    if (form.valid) {
      const appointment: Appointment = {
        id: 'A_' + Date.now(),
        patientId: 'P123', // Replace with actual patient ID
        doctorId: this.patient.doctorName!,
        doctorName: this.availableDoctors.find(d => d.id === this.patient.doctorName)?.name || '',
        speciality: this.patient.speciality!,
        date: this.patient.date!,
        startTime: this.patient.startTime!,
        endTime: this.patient.endTime!,
        status: 'confirmed',
        patientName: 'John Doe' // Replace with actual patient name
      };
      const appointmentPaylaod:any={
        patientId: 'P123', // Replace with actual patient ID
        doctorId: this.patient.doctorName!,
        doctorName: this.availableDoctors.find(d => d.id === this.patient.doctorName)?.name || '',
        speciality: this.patient.speciality!,
        date: this.patient.date!,
        startTime: this.patient.startTime!,
        endTime: this.patient.endTime!,
        status: 'confirmed',
        patientName: 'John Doe'
      }
      
this.http.post('http://localhost:5000/appointments/bookAppointment', appointmentPaylaod)
  .subscribe({
    next: (response) => console.log('Appointment booked:', response),
    error: (err) => console.error('Booking failed:', err)
  });

      // this.appointmentService.bookAppointment(appointment).subscribe(() => {
      //   alert('Appointment booked successfully!');
      //   this.bookingCompleted.emit();
      //   form.resetForm();
      //   this.showSlots = false;
      // });
  //   }
  // }
  this.appointmentService.bookAppointment(appointment).subscribe({
  next: () => {
    alert('Appointment booked successfully!');
    this.bookingCompleted.emit();
    form.resetForm();
    this.showSlots = false;
  },
  error: (err) => {
    console.error('Booking failed:', err);
    alert('Booking failed. Please try again.');
  }
});
}
  }
}
