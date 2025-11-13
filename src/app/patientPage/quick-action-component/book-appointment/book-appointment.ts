import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Appointment, Patients } from '../../../Model/appointment';
import { BookAppointmentService } from '../../../services/book-appointment-service';
import { AuthService } from '../../../services/auth-service';

declare var bootstrap: any;

interface DoctorSlot {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

interface DoctorCalendar {
  date: any;
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
  @Output() booked = new EventEmitter<void>();

  apptform: any;
  constructor(
    private bookAppointmentService: BookAppointmentService,
    private authService: AuthService
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

  specialties: any[] = [];

  doctors: any[] = [];
  availableDoctors: any[] = [];

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

    const patientId = this.authService.getUserId();
    if (!patientId) {
      alert('You must be logged in to book an appointment.');
      return;
    }

    const appointmentData = {
      patientId,
      registrationNumber: this.selectedDoctor.registrationNumber,
      date: this.patient.date,
      startTime: this.patient.time,
      endTime: this.patient.endTime
    };

    this.bookAppointmentService.bookAppointment(appointmentData).subscribe({
      next: (response) => {
        alert('Thank you! Your appointment is booked successfully.');
        this.booked.emit();
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
    this.bookAppointmentService.getDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
        this.availableDoctors = doctors;
        console.log('doctors fetched:', doctors);
        this.specialties = Array.from(new Set(doctors.map((d: any) => d.specialty))).sort();
      },
      error: (error) => {
        console.error('Error fetching doctors:', error);
      }
    });
  }
}
