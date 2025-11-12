import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeSlots } from '../../../services/time-slots';

@Component({
  selector: 'app-create-slot',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-slot.html',
  styleUrl: './create-slot.css',
})
export class CreateSlot implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Output() loadTable = new EventEmitter();
  @Output() newPayload = new EventEmitter<{}>();
  @Input() slotData: { date: string; id: string; startTime: string; endTime: string } | null = null;
  @Input() editSlot: boolean = false;

  selectedDate: string = '';
  startTime: string = '';
  endTime: string = '';
  minDate: string = '';
  newTimeSlotsByDate: { [date: string]: { startTime: string; endTime: string }[] } = {};
  validationMessage: string = '';
  isFormValid: boolean = false;
  orignalDate: string = '';
  isEdit: boolean = false;
  previousSlot: { date: string; startTime: string; endTime: string } | null = null;

  constructor(private timeSlotsService: TimeSlots) {}

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    console.log('slotData--', this.slotData);
    if (this.slotData) {
      this.selectedDate = this.formatDate(this.slotData?.date) || '';
      this.startTime = this.slotData?.startTime || '';
      this.endTime = this.slotData?.endTime || '';
      this.previousSlot = {
        date: this.selectedDate,
        startTime: this.startTime,
        endTime: this.endTime,
      };
    }
    this.orignalDate = this.selectedDate;
  }

  getDates(): string[] {
    return Object.keys(this.newTimeSlotsByDate);
  }

  get hasTimeSlots(): boolean {
    return Object.keys(this.newTimeSlotsByDate).length > 0;
  }

  validateForm() {
    this.validationMessage = '';
    this.isFormValid = true;

    if (!this.selectedDate || !this.startTime || !this.endTime) {
      this.isFormValid = false;
      return;
    }

    const today = new Date();
    if (this.selectedDate === this.minDate) {
      const nowTime = today.toTimeString().slice(0, 5); // "HH:mm"
      if (this.startTime < nowTime) {
        this.validationMessage = 'Start time cannot be less than current time for today.';
        this.isFormValid = false;
        return;
      }
    }

    if (this.endTime <= this.startTime) {
      this.validationMessage = 'End time must be greater than start time.';
      this.isFormValid = false;
      return;
    }
  }

  addTimeSlot() {
    if (!this.selectedDate || !this.startTime || !this.endTime) {
      alert('Please fill mandatory fields');
      return;
    }

    const date = this.selectedDate;

    if (this.startTime >= this.endTime) {
      alert('End time must be after start time.');
      return;
    }

    if (!this.newTimeSlotsByDate[date]) {
      this.newTimeSlotsByDate[date] = [];
    }

    for (let obj of this.newTimeSlotsByDate[date]) {
      if (obj.startTime === this.startTime && obj.endTime === this.endTime) {
        alert('Slot already present');
        return;
      }

      const existingStart = obj.startTime;
      const existingEnd = obj.endTime;

      if (
        (this.startTime >= existingStart && this.startTime < existingEnd) ||
        (this.endTime > existingStart && this.endTime <= existingEnd) ||
        (this.startTime <= existingStart && this.endTime >= existingEnd)
      ) {
        alert('Time slot overlaps with an existing slot');
        return;
      }
    }

    this.newTimeSlotsByDate[date].push({ startTime: this.startTime, endTime: this.endTime });
    this.isEdit = false;
  }


  timeSlots() {

    // this.newTimeSlotsByDate[this.selectedDate] = [
    //   { startTime: this.startTime, endTime: this.endTime },
    // ];
    console.log("before building payload", this.newTimeSlotsByDate);
    const payload = this.buildPayload();
    console.log('Final Payload:', payload);

    this.timeSlotsService.timeSlots(payload).subscribe({
      next: (response) => {
        console.log(`Edit action successful:`, response);
        if (response.rejectedSlots && response.rejectedSlots.length > 0) {
          const rejectedMessage = response.rejectedSlots
            .map(
              (slot: any) =>
                `Date: ${slot.date}, Time: ${slot.startTime}-${slot.endTime}\nReason: ${slot.reason}`
            )
            .join('\n\n');

          alert(`Some slots were not created:\n\n${rejectedMessage}`);
        }
        this.loadTable.emit();
        this.newTimeSlotsByDate = {};
        this.cancel();
      },
      error: (err) => {
        console.error(`Error editing time slots:`, err);
      },
    });
  }
  editTimeSlots() {
    if (!this.editSlot) return;
    const newSlot = {
      date: this.selectedDate,
      startTime: this.startTime,
      endTime: this.endTime,
    };
    this.timeSlotsService.editTimeSlots(this.previousSlot!, newSlot).subscribe({
      next: (response) => {
        console.log('Slots edited successfully:', response);
        this.loadTable.emit();
        this.newTimeSlotsByDate = {};
        this.cancel();
      },
      error: (err) => {
        console.error('Error editing slots:', err);
      },
    });
  }

  cancel() {
    this.selectedDate = '';
    this.startTime = '';
    this.endTime = '';
    this.newTimeSlotsByDate = {};
    this.slotData = null;
    this.isEdit = false;
    this.closeModal.emit();
  }

  deleteTimeSlot(index: number, date: string) {
    this.newTimeSlotsByDate[date].splice(index, 1);
    if (this.newTimeSlotsByDate[date].length === 0) {
      delete this.newTimeSlotsByDate[date];
    }
  }

  editTimeSlot(index: number, date: string, startTime: string, endTime: string) {
    this.selectedDate = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.isEdit = true;
    this.deleteTimeSlot(index, date);
  }

  private buildPayload() {
    const calendar = Object.keys(this.newTimeSlotsByDate).map((date) => {
      const availableSlots = this.newTimeSlotsByDate[date].map((slot) => {
        return {
          startTime: slot.startTime,
          endTime: slot.endTime,
        };
      });
      return { date, availableSlots };
    });

    return { calendar };
  }


  formatDate(isoDate: string): string {
    const dateObj = new Date(isoDate);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // ✅ yyyy-mm-dd
  }



  createTimeSlot(payload: any) {
    this.timeSlotsService.createTimeSlot(payload).subscribe({
      next: (response) => {
        console.log('Slots created successfully:', response);
        this.loadTable.emit();
        this.newTimeSlotsByDate = {};
        this.cancel();
      },
      error: (err) => {
        console.error('Error creating slots:', err);
      },
    });
  }
}
