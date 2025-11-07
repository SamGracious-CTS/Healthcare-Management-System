import { Component, Input } from '@angular/core';

//import { Patient, ConsultationRecord } from '../../../services/consultation';
import { Patient } from '../../../Model/patient.model';
import { ConsultationRecord } from '../../../Model/consultation-record.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultation-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultation-history.html',
  styleUrls: ['./consultation-history.css']
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
