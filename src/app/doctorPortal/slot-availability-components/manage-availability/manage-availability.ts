import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Availability } from '../../../services/availability';
import { CreateSlot } from '../create-slot/create-slot';
import { TimeSlots } from '../../../services/time-slots';

@Component({
  selector: 'app-manage-availability',
  imports: [FormsModule, CommonModule, CreateSlot],
  standalone: true,
  templateUrl: './manage-availability.html',
  styleUrl: './manage-availability.css',
})
export class ManageAvailability implements OnInit {
  headings: string[] = ['S No.', 'Date', 'Start Time', 'End Time', 'Actions'];
  showSlotForm = false;

  newTimeSlotsByDate: { [date: string]: { id: string; startTime: string; endTime: string }[] } = {};
  tableData: { date: string; id: string; startTime: string; endTime: string }[] = [];

  isEditSlot: boolean = false;
  selectedSlot: { date: string; id: string; startTime: string; endTime: string } | null = null;

  constructor(private timeSlotsService: TimeSlots) {}

  ngOnInit(): void {
    this.getTimeSlots();
  }
  // getFlattenedSlots(): { date: string; startTime: string; endTime: string; id: string }[] {
  //   this.tableData = [];

  //   this.newTimeSlotsByDate = this.availabilityService.getSavedSlots();

  //   for (const date in this.newTimeSlotsByDate) {
  //     const timeArray = this.newTimeSlotsByDate[date];

  //     for (const time of timeArray) {
  //       const alreadyExists = this.tableData.some(
  //         (obj) =>
  //           obj.date === date && obj.startTime === time.startTime && obj.endTime === time.endTime
  //       );

  //       if (alreadyExists) {
  //         alert(`Entry for ${date} from: ${time.startTime} to: ${time.endTime} already present`);
  //       } else {
  //         this.tableData.push({
  //           date,
  //           startTime: time.startTime,
  //           endTime: time.endTime,
  //           id: time.id, // ✅ Include ID for edit/delete
  //         });
  //       }
  //     }
  //   }

  //   return this.tableData;
  // }

  getTimeSlots() {
    this.timeSlotsService.getTimeSlots().subscribe({
      next: (response) => {
        this.tableData = response.slots;
        console.log('Slots:', response);
      },
      error: (err) => {
        console.error('Error fetching time slots:', err);
      },
    });
  }

  deleteTimeSlot(slot: any) {
    // this.availabilityService.deleteSlot(slot.date, slot.id);
    const payload = {
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
    };

    this.timeSlotsService.deleteTimeSlot(payload).subscribe({
      next: (response) => {
        console.log('Slots:', response);
        this.getTimeSlots();
      },
      error: (err) => {
        console.error('Error fetching time slots:', err);
      },
    });
  }

  editTimeSlot(slot: { date: string; id: string; startTime: string; endTime: string }) {
    this.isEditSlot = true;
    this.showSlotForm = true;
    this.selectedSlot = slot;
    // this.getFlattenedSlots();
    // this.getTimeSlots();
  }

  cancelModal() {
    this.isEditSlot = false;
    this.showSlotForm = false;
    this.selectedSlot = null;
    // this.getTimeSlots();
  }
}
