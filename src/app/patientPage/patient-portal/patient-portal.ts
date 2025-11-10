import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header-component/header-component';
import { QuickActionComponent } from '../quick-action-component/quick-action-component';
import { UpcomingAppointments } from '../upcoming-appointments/upcoming-appointments';

@Component({
  selector: 'app-patient-portal',
  standalone: true,
  imports: [CommonModule, HeaderComponent, QuickActionComponent, UpcomingAppointments],
  templateUrl: './patient-portal.html'
})
export class PatientPortal {
  @ViewChild(UpcomingAppointments) upcomingAppointments!: UpcomingAppointments;

  refreshAppointments() {
    console.log('Refreshing appointments'); // Debug log
    this.upcomingAppointments?.getAppointments();
  }
}
