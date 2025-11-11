import { Component } from '@angular/core';
import { ConsultationNotes } from "../consultation-notes/consultation-notes";
import { AvailabilityComponent } from './availability-component/availability-component';
import { NotesComponent } from './notes-component/notes-component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header-component/header-component';
import { AppointmentService } from '../../services/appointment-service';


@Component({
  selector: 'app-doctor-page',
  imports: [ AvailabilityComponent, NotesComponent, CommonModule, FormsModule, HeaderComponent],
  templateUrl: './doctor-page.html',
  styleUrl: './doctor-page.css'
})
export class DoctorPage {
  patientName :string | null = '';

   activeButton: string = '';


  setActive(button: string) {
    this.activeButton = button;
  }







}
