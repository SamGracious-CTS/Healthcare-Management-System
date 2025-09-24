import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginSignupComponent } from './LoginPage/login-signup-component/login-signup-component';
import { ConsultationNotes } from './doctorPortal/consultation-notes/consultation-notes';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginSignupComponent, ConsultationNotes],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  //protected readonly title = signal('project-1');
}
