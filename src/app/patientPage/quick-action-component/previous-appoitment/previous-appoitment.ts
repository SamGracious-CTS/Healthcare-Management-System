import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Appointment } from '../../../services/appointment';


@Component({
  selector: 'app-previous-appoitment',
  imports: [CommonModule],
  templateUrl: './previous-appoitment.html',
  styleUrl: './previous-appoitment.css'
})
export class PreviousAppoitment {
appointments: any[] = [];
  constructor(private appointment: Appointment) {}
 
  ngOnInit(): void {
    this.appointments = this.appointment.getAppointments();
  }
}
