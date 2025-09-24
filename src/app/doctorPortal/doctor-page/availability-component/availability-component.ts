import { Component } from '@angular/core';
import { ManageAvailability } from '../../slot-availability-components/manage-availability/manage-availability';

@Component({
  selector: 'app-availability-component',
  imports: [ManageAvailability],
  templateUrl: './availability-component.html',
  styleUrl: './availability-component.css'
})
export class AvailabilityComponent {

}
