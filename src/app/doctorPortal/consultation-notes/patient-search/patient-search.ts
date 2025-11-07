import { Component, EventEmitter, Input, Output } from '@angular/core';

//import { Patient} from '../../../services/consultation';
import { Patient } from '../../../Model/patient.model';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-search.html',
  styleUrls: ['./patient-search.css']
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
