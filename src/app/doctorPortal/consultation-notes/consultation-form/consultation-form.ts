import { Component, Input, Output, EventEmitter } from '@angular/core';

//import { Patient, ConsultationRecord } from '../../../services/consultation';
import { Patient } from '../../../Model/patient.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultation-form.html',
  styleUrls: ['./consultation-form.css']
})
export class ConsultationForm {

  @Input() selectedPatient: Patient | null = null;
  @Output() addConsultation = new EventEmitter<{ notes: string; prescription: string }>();

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

    this.addConsultation.emit({ notes: this.notes, prescription: this.prescription });

    this.notes = '';
    this.prescription = '';

  }

}
