import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Patient } from '../../../Model/consultationRecord';

interface ConsultationRecord {
  patientId: string;
  patientName: string;
  date: string;
  notes: string;
  prescription: string;
}

@Component({
  selector: 'app-consultation-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultation-history.html',
  styleUrl: './consultation-history.css'
})
export class ConsultationHistory {
  @Input() consultationRecords: any[]= [];
  @Input() selectedPatient: any | null = null;

  get filteredRecords() {
    if (!this.selectedPatient) {
      return this.consultationRecords;
    }
    return this.consultationRecords.filter(
      (record: any) => record.patientId === this.selectedPatient?.id
    );
  }
}
