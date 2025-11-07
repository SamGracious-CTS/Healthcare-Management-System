import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatientSearch } from './patient-search/patient-search';
import { ConsultationForm } from './consultation-form/consultation-form';
import { ConsultationHistory } from './consultation-history/consultation-history';
import { ConsultationApiService } from '../../services/consultation-api.service';
import { Patient } from '../../Model/patient.model';
import { ConsultationRecord } from '../../Model/consultation-record.model';

@Component({
  selector: 'app-consultation-notes',
  standalone: true,
  imports: [CommonModule, FormsModule, PatientSearch, ConsultationForm, ConsultationHistory],
  templateUrl: './consultation-notes.html',
  styleUrls: ['./consultation-notes.css']
})
export class ConsultationNotes {
  patients: Patient[] = [];
  selectedPatient: Patient | null = null;
  consultationRecords: ConsultationRecord[] = [];
  private appointments: any[] = [];
  private selectedAppointmentId: string | null = null;

  constructor(private api: ConsultationApiService) {}

  ngOnInit(): void {
    this.consultationRecords = this.api.getConsultations();
    this.loadAppointments();
  }

  private loadAppointments() {
    const doctorId = localStorage.getItem('doctorId') || '655000000000000000000001';
    this.api.getAppointmentsByDoctor(doctorId).subscribe({
      next: (appointments) => {
        this.appointments = appointments || [];

        const map = new Map<string, Patient>();
        this.appointments.forEach(a => {
          const p = a.patientId;
          const id = p._id || p.id;
          if (!map.has(id)) {
            const patient: Patient = {
              id: id,
              name: p.name || 'Unknown',
              age: p.age || 0,
              gender: p.gender || 'Other'
            };
            map.set(id, patient);
            this.api.addPatient(patient);
          }
        });

        this.patients = Array.from(map.values());
      },
      error: (err) => {
        console.error('Failed to load appointments', err);
      }
    });
  }

  onPatientSelected(patient: Patient) {
    this.selectedPatient = patient;
    const appt = this.appointments.find(a => {
      const pid = a.patientId?._id || a.patientId;
      return pid === patient.id;
    });
    this.selectedAppointmentId = appt ? (appt._id || appt.id) : null;
  }

  async onAddConsultation(payload: { notes: string; prescription: string }) {
    if (!this.selectedPatient || !this.selectedAppointmentId) {
      alert('Select a patient with an appointment first');
      return;
    }

    const doctorId = localStorage.getItem('doctorId') || '655000000000000000000001';

    this.api.createConsultation(doctorId, this.selectedAppointmentId, payload).subscribe({
      next: (res) => {
        const saved = res.consultation || res;
        const newRecord: ConsultationRecord = {
          consultationId: saved._id || ('C' + Math.floor(Math.random() * 10000)),
          doctorId: doctorId,
          appointmentId: this.selectedAppointmentId!,
          patientId: this.selectedPatient!.id,
          patientName: this.selectedPatient!.name,
          date: (saved.createdAt || new Date()).toString().split('T')[0],
          notes: saved.notes || payload.notes,
          prescription: saved.prescription || payload.prescription
        };

        this.api.addConsultation(newRecord);
        this.consultationRecords = this.api.getConsultations();

        alert('Consultation saved successfully');
      },
      error: (err) => {
        console.error('Failed to save consultation', err);
        alert('Failed to save consultation');
      }
    });
  }
}
