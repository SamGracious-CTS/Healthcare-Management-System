import { Component, Input, Output, EventEmitter } from '@angular/core';

//import { Patient, ConsultationRecord } from '../../../services/consultation';
import { Patient, ConsultationRecord } from '../../../Model/consultationRecord';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultation-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './consultation-form.html',
  styleUrl: './consultation-form.css'
})
export class ConsultationForm {

  @Input() selectedPatient: Patient | null = null;
  @Output() addConsultation = new EventEmitter<ConsultationRecord>();

  notes: string = '';
  prescription: string = '';

  submitConsultation() {
    if(!this.selectedPatient) {
      alert('Please select a patient first !!');
      return;
    }

    if(!this.notes || !this.prescription) {
      alert('Please fill both notes and presciption !!');
      return;
    } 

    const newRecord: ConsultationRecord = {
      consultationId: 'C' + Math.floor(Math.random() * 1000),
      patientId: this.selectedPatient.id,
      patientName: this.selectedPatient.name,
      date: new Date().toISOString().split('T')[0],
      notes: this.notes,
      prescription: this.prescription
    }

    this.addConsultation.emit(newRecord);

    this.notes = '';
    this.prescription = '';

  }





}
