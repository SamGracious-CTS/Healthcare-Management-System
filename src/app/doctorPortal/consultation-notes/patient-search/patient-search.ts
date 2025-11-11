import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Patient } from '../../../Model/consultationRecord';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-search.html',
  styleUrl: './patient-search.css'
})
export class PatientSearch {

  @Input() patients: Patient[] = [];
  @Output() patientSelected = new EventEmitter<Patient>();

  searchText: string = '';

  onSelectPatient(patient: Patient) {
    this.patientSelected.emit(patient);
  }

  get filteredPatients() {
    if(!this.searchText)
      return this.patients;
    return this.patients.filter(p => p.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }




}
