import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Appointment, Patients } from '../../../Model/appointment';
import { AppointmentService } from '../../../services/appointment-service';
import { BookAppointmentService } from '../../../services/book-appointment-service';

declare var bootstrap: any;

interface DoctorSlot {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

interface DoctorCalendar {
  date: any; // backend may return { $date: '...' } or string
  availableSlots: DoctorSlot[];
}

interface Doctor {
  _id: string;
  registrationNumber: string;
  name: string;
  email: string;
  specialty: string;
  calendar: DoctorCalendar[];
}

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './book-appointment.html',
  styleUrls: ['./book-appointment.css'],
})
export class BookAppointment implements OnInit {
  apptform: any;
  constructor(
    private appointmentService: AppointmentService,
    private bookAppointmentService: BookAppointmentService
  ) {}

  patient: Partial<Patients & { registrationNumber?: string; endTime?: string }> = {
    name: '',
    gender: '',
    age: 0,
    phoneNumber: '',
    doctorName: '',
    speciality: '',
    date: '',
    time: '',
    status: 'Confirmed',
    registrationNumber: ''
  };

  specialties = [
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'General Medicine',
  ];

  doctors: any[] = []; // store all doctors
  availableDoctors: any[] = []; // filtered doctors (objects)

  selectedDoctor?: Doctor;
  availableSlots: DoctorSlot[] = [];

  // for dropdowns
  dateOptions: { value: string; label: string }[] = [];

  onSpecialtyChange(): void {
    const specialty = this.patient.speciality;
    if (specialty) {
      this.bookAppointmentService.getDoctorsBySpecialty(specialty).subscribe({
        next: (doctors: any[]) => {
          this.doctors = doctors;
          this.availableDoctors = doctors;
        },
        error: (error) => {
          console.error('Error fetching doctors:', error);
          this.availableDoctors = [];
        }
      });
    } else {
      this.availableDoctors = this.doctors;
    }
    this.patient.registrationNumber = '';
    this.selectedDoctor = undefined;
    this.availableSlots = [];
    this.dateOptions = [];
    this.patient.date = '';
  }

  // called with registrationNumber (value of option)
  onDoctorChange(registrationNumber: string): void {
    this.selectedDoctor = this.doctors.find(d => d.registrationNumber === registrationNumber);
    this.patient.doctorName = this.selectedDoctor?.name || '';
    this.patient.date = '';
    this.patient.time = '';
    this.patient.endTime = '';
    this.availableSlots = [];
    this.buildDateOptions();
  }

  private normalizeDateValue(raw: any): string {
    const dateStr = raw?.$date ?? raw;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  }

  private formatLabelFromIso(iso: string): string {
    // produce readable label like "2025-11-26 (Wed)" or just ISO date
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return `${iso} (${d.toLocaleDateString(undefined, { weekday: 'short' })})`;
  }

  private buildDateOptions() {
    this.dateOptions = [];
    if (!this.selectedDoctor || !Array.isArray(this.selectedDoctor.calendar)) return;

    for (const cal of this.selectedDoctor.calendar) {
      const iso = this.normalizeDateValue((cal as any).date);
      if (!iso) continue;
      // include only dates that have at least one unbooked availableSlot
      const hasSlots = (cal.availableSlots || []).some((s: DoctorSlot) => !s.isBooked);
      if (!hasSlots) continue;
      this.dateOptions.push({ value: iso, label: this.formatLabelFromIso(iso) });
    }

    // optionally sort ascending
    this.dateOptions.sort((a, b) => a.value.localeCompare(b.value));
  }

  private populateSlotsForDate(selectedDateISO: string) {
    if (!this.selectedDoctor || !selectedDateISO) {
      this.availableSlots = [];
      return;
    }

    const calendarEntry = this.selectedDoctor.calendar.find(cal => {
      const calDateIso = this.normalizeDateValue((cal as any).date);
      return calDateIso === selectedDateISO;
    });

    this.availableSlots = calendarEntry?.availableSlots.filter((slot: DoctorSlot) => !slot.isBooked) || [];
    this.patient.time = '';
    this.patient.endTime = '';
  }

  onDateDropdownChange(selectedDateIso: string) {
    this.patient.date = selectedDateIso;
    this.populateSlotsForDate(selectedDateIso);
  }

  onSlotDropdownChange(selectedStartTime: string) {
    const slot = this.availableSlots.find(s => s.startTime === selectedStartTime);
    if (slot) {
      this.patient.time = slot.startTime;
      this.patient.endTime = slot.endTime;
    } else {
      this.patient.time = '';
      this.patient.endTime = '';
    }
  }

  selectSlot(slot: DoctorSlot) {
    this.patient.time = slot.startTime;
    this.patient.endTime = slot.endTime;
  }

  bookAppointment(form: NgForm) {
    if (!form.valid || !this.selectedDoctor) return;

    const patientId = localStorage.getItem('userId');
    if (!patientId) {
      alert('You must be logged in to book an appointment.');
      return;
    }

    const appointmentData = {
      patientId, // added patientId from localStorage
      registrationNumber: this.selectedDoctor.registrationNumber,
      date: this.patient.date,
      startTime: this.patient.time,
      endTime: this.patient.endTime
    };

    this.bookAppointmentService.bookAppointment(appointmentData).subscribe({
      next: (response) => {
        this.submit = true;
        this.patient.time = '';
        this.patient.endTime = '';
        this.patient.date = '';
        this.showSlots = false;
        this.availableSlots = [];
        this.dateOptions = [];
        alert('Thank you! Your appointment is booked successfully.');
        form.resetForm();
      },
      error: (error) => {
        console.error('Error booking appointment:', error);
        alert('Failed to book appointment. Please try again.');
      }
    });
  }

  timeSlots: string[] = [];
  showSlots = false;
  form: any;
  todayString = new Date().toISOString().split('T')[0];
  submit = false;

  ngOnInit() {
    // Get all doctors on component initialization
    this.bookAppointmentService.getDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
        this.availableDoctors = doctors;
      },
      error: (error) => {
        console.error('Error fetching doctors:', error);
      }
    });
  }
}
