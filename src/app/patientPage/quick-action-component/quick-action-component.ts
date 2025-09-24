declare var bootstrap: any;
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookAppointment } from './book-appointment/book-appointment';
import { PreviousAppoitment } from './previous-appoitment/previous-appoitment';
import { Prescription } from './prescription/prescription';
// import { ManageAvailability } from '../doctorPortal/slot-availability-components/manage-availability/manage-availability';
import { ManageAvailability } from '../../doctorPortal/slot-availability-components/manage-availability/manage-availability';
// import { CreateSlot } from '../doctorPortal/slot-availability-components/create-slot/create-slot';
import { CreateSlot } from '../../doctorPortal/slot-availability-components/create-slot/create-slot';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-quick-action-component',
  imports: [CommonModule,FormsModule,BookAppointment,PreviousAppoitment,Prescription, ManageAvailability, CreateSlot,RouterModule],
  templateUrl: './quick-action-component.html',
  styleUrl: './quick-action-component.css'
})
export class QuickActionComponent {

 showAvailabilityModal:boolean =false;
  activeButton: string=''

setActive(buttonName: string) {
this.activeButton = buttonName
 

}


}





