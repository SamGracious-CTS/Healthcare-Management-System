  import { CommonModule } from '@angular/common';
  import { Component, OnInit } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { PatientSearch } from './patient-search/patient-search';
  import { ConsultationForm } from './consultation-form/consultation-form';
  import { ConsultationHistory } from './consultation-history/consultation-history';
  import { ConsultationRecord, Patient } from '../../Model/consultationRecord';
  import { Consultation } from '../../services/consultation';


  @Component({
    selector: 'app-consultation-notes',
    imports: [CommonModule, FormsModule, PatientSearch, ConsultationForm, ConsultationHistory],

    templateUrl: './consultation-notes.html',
    styleUrl: './consultation-notes.css'
  })
  export class ConsultationNotes implements OnInit {

    patients: Patient[] = [];
      selectedPatient: Patient | null = null;
      consultationRecords: ConsultationRecord[] = [];

      constructor(private consultationService: Consultation) { }

      ngOnInit(): void {
  
    this.patients = this.consultationService.getPatients();
    this.consultationRecords = this.consultationService.getConsultations();
  }

      onPatientSelected(patient: Patient)
      {
        this.selectedPatient = patient;
      }

      onAddConsultation(record: ConsultationRecord){
        this.consultationService.addConsultation(record);
      }


  }
