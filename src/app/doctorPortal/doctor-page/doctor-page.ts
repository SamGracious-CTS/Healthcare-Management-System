import { Component } from '@angular/core';
import { ConsultationNotes } from "../consultation-notes/consultation-notes";
import { AvailabilityComponent } from './availability-component/availability-component';
import { NotesComponent } from './notes-component/notes-component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header-component/header-component';

@Component({
  selector: 'app-doctor-page',
  imports: [ConsultationNotes, AvailabilityComponent, NotesComponent, CommonModule, FormsModule, HeaderComponent],
  templateUrl: './doctor-page.html',
  styleUrl: './doctor-page.css'
})
export class DoctorPage {

   activeButton: string = '';

  setActive(button: string) {
    this.activeButton = button;
  }

}
