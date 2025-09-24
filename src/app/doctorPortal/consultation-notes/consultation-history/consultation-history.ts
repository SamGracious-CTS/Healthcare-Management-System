import { Component, Input } from '@angular/core';

//import { Patient, ConsultationRecord } from '../../../services/consultation';
import { Patient, ConsultationRecord } from '../../../services/consultation';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultation-history',
  imports: [CommonModule, FormsModule],
  templateUrl: './consultation-history.html',
  styleUrl: './consultation-history.css'
})
export class ConsultationHistory {

  @Input() consultationRecords: ConsultationRecord[] = [];
  @Input() selectedPatient: Patient | null = null;

  get filteredRecords() {
    if(!this.selectedPatient) 
      return this.consultationRecords;
    return this.consultationRecords.filter(record => record.patientId === this.selectedPatient?.id)
  }



}
