import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatientSearch } from './patient-search/patient-search';
import { ConsultationForm } from './consultation-form/consultation-form';
import { ConsultationHistory } from './consultation-history/consultation-history';
import { ConsultationRecord, Patient } from '../../Model/consultationRecord';
import { Consultation } from '../../services/consultation';
import { ConsultationApiService } from '../../services/consultation-api-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consultation-notes',
  imports: [CommonModule, FormsModule, PatientSearch, ConsultationForm, ConsultationHistory],

  templateUrl: './consultation-notes.html',
  styleUrl: './consultation-notes.css',
})
export class ConsultationNotes implements OnInit {
  patients: Patient[] = [];
  appointments: any = [];
  selectedPatient: Patient | null = null;
  consultationRecords: any = [];

  constructor(
    private consultationService: Consultation,
    private consultationApiService: ConsultationApiService
  ) {}

  ngOnInit(): void {
    this.getAppointments();
    this.getConsultationHistory();
  }

  onPatientSelected(patient: Patient) {
    this.selectedPatient = patient;
  }

  onAddConsultation(record: ConsultationRecord) {
    this.consultationApiService.createConsultation(record).subscribe({
      next: (res) => {
        console.log('Consultation saved successfully:', res);
        this.getConsultationHistory();
      },
      error: (err) => {
        console.error('Failed to save consultation:', err);
      }
    });

  }

  getAppointments() {
    this.consultationApiService.getConsultations().subscribe({
      next: (res) => {
        this.patients = res
        console.log('Loaded consultations:', res);
      },
      error: (err) => {
        console.error('Failed to load consultations:', err);
        this.appointments = [];
      }
    });
  }
  getConsultationHistory() {
    this.consultationApiService.getConsultationHistory().subscribe({
      next: (res) => {
        this.consultationRecords = res?.consultations ?? res ?? [];
        console.log('Loaded consultation history:', res.consultations);
      },
      error: (err) => {
        console.error('Failed to load consultation history:', err);
        this.consultationRecords = [];
      }
    });
  }
}
