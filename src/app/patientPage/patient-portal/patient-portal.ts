import { Component } from '@angular/core';
import { QuickActionComponent } from '../quick-action-component/quick-action-component';
import { UpcomingAppointments } from '../upcoming-appointments/upcoming-appointments';
import { HeaderComponent } from '../../header-component/header-component';


@Component({
  selector: 'app-patient-portal',
  imports: [QuickActionComponent, UpcomingAppointments, HeaderComponent], 
  templateUrl: './patient-portal.html',
  styleUrl: './patient-portal.css'
})
export class PatientPortal {

  

}
