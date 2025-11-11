import { Component, Input, Output, EventEmitter } from '@angular/core';

//import { Patient, ConsultationRecord } from '../../../services/consultation';
import { Patient, ConsultationRecord } from '../../../Model/consultationRecord';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-consultation-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './consultation-form.html',
  styleUrl: './consultation-form.css'
})
export class ConsultationForm {

  @Input() selectedPatient: any | null = null;
  @Output() addConsultation = new EventEmitter<ConsultationRecord>();

  notes: string = '';
  prescription: string = '';
  constructor(private authServie: AuthService) {}

  submitConsultation() {
    console.log("patient:", this.selectedPatient);
    if(!this.selectedPatient) {
      alert('Please select a patient first !!');
      return;
    }

    if(!this.notes || !this.prescription) {
      alert('Please fill both notes and presciption !!');
      return;
    }

    const newRecord: any = {
      // consultationId: 'C' + Math.floor(Math.random() * 1000),
      patientId: this.selectedPatient.patentId,
      appointmentId: this.selectedPatient.appointmentId,
      date: this.selectedPatient.date,
      notes: this.notes,
      prescription: this.prescription,
      registrationNumber: this.authServie.getDoctorId()
    }

    this.addConsultation.emit(newRecord);

    this.notes = '';
    this.prescription = '';

  }





}
