import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Availability } from '../../../services/availability';
import { CreateSlot } from '../create-slot/create-slot';
 
@Component({
  selector: 'app-manage-availability',
  imports: [FormsModule, CommonModule, CreateSlot],
  templateUrl: './manage-availability.html',
  styleUrl: './manage-availability.css',
})
export class ManageAvailability {
  headings: string[] = ['S No.', 'Date', 'Start Time', 'End Time', 'Actions'];
  showSlotForm = false;
 
  newTimeSlotsByDate: { [date: string]: { id: string; startTime: string; endTime: string }[] } = {};
  tableData: { date: string; id: string; startTime: string; endTime: string }[] = [];
 
  isEditSlot: boolean = false;
  selectedSlot: { date: string;id:string; startTime: string; endTime: string } | null = null;
 
  constructor(private availabilityService: Availability) {}
 
  getFlattenedSlots(): { date: string; startTime: string; endTime: string; id: string }[] {
    this.tableData = [];
    
    this.newTimeSlotsByDate = this.availabilityService.getSavedSlots();
 
    for (const date in this.newTimeSlotsByDate) {
      const timeArray = this.newTimeSlotsByDate[date];
 
      for (const time of timeArray) {
        const alreadyExists = this.tableData.some(
          (obj) =>
            obj.date === date && obj.startTime === time.startTime && obj.endTime === time.endTime
        );
 
        if (alreadyExists) {
          alert(`Entry for ${date} from: ${time.startTime} to: ${time.endTime} already present`);
        } else {
          this.tableData.push({
            date,
            startTime: time.startTime,
            endTime: time.endTime,
            id: time.id, // ✅ Include ID for edit/delete
          });
        }
      }
    }
 
    return this.tableData;
  }
 
  deleteTimeSlot(slot: { date: string; id: string }) {
    this.availabilityService.deleteSlot(slot.date, slot.id);
    this.getFlattenedSlots();
  }
 
  editTimeSlot(slot: { date: string; id: string; startTime: string; endTime: string }) {
    this.isEditSlot = true;
    this.showSlotForm = true;
    this.selectedSlot = slot;
    this.getFlattenedSlots();
  }
 
  cancelModal() {
    this.isEditSlot = false;
    this.showSlotForm = false;
    this.selectedSlot = null;
    this.getFlattenedSlots();
  }
}
 
 