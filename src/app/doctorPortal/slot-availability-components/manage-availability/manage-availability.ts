import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  headings: string[] = ['S No.', 'Date', 'Start Time', 'End Time','Booked', 'Actions'];
  showSlotForm = false;

  newTimeSlotsByDate: { [date: string]: { id: string; startTime: string; endTime: string }[] } = {};
  tableData: { date: string; id: string; startTime: string; endTime: string, isBooked: boolean }[] = [];

  isEditSlot: boolean = false;
  selectedSlot: { date: string; id: string; startTime: string; endTime: string } | null = null;

  constructor(private timeSlotsService: TimeSlots) {}

  ngOnInit(): void {
    this.getTimeSlots();
  }


  getTimeSlots() {
    this.timeSlotsService.getTimeSlots().subscribe({
      next: (response) => {
        this.tableData = response;
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
      // date: slot.date,
      date: new Date(slot.date).toISOString().split("T")[0],
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
