import { Component } from '@angular/core';
import { ConsultationNotes } from '../../consultation-notes/consultation-notes';

@Component({
  selector: 'app-notes-component',
  imports: [ConsultationNotes],
  templateUrl: './notes-component.html',
  styleUrl: './notes-component.css'
})
export class NotesComponent {

}
