import { Availability } from './../../../services/availability';
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
// export class CreateSlot implements OnInit {
//   @Output() closeModal = new EventEmitter();
//   // @Output() payload = new EventEmitter<{ timeSlotsByDate: { [date: string]: string[] } }>();
//   @Output() newPayload = new EventEmitter<{}>();
//   @Input() slotData: { date: string; id: string; startTime: string; endTime: string } | null = null;
//   @Input() editSlot: boolean = false;

//   selectedDate: string = '';
//   startTime: string = '';
//   endTime: string = '';
//   minDate: string = '';
//   newTimeSlotsByDate: { [date: string]: { startTime: string; endTime: string }[] } = {};
//   validationMessage: string = '';
//   isFormValid: boolean = false;
//   orignalDate: string = '';
//   isEdit: boolean = false;

//   constructor(private availabilityService: Availability) {}
//   ngOnInit(): void {
//     const today = new Date();
//     this.minDate = today.toISOString().split('T')[0];

//     this.selectedDate = this.slotData?.date || '';
//     this.orignalDate = this.selectedDate;
//     this.startTime = this.slotData?.startTime || '';
//     this.endTime = this.slotData?.endTime || '';
//   }

//   getDates(): string[] {
//     return Object.keys(this.newTimeSlotsByDate);
//   }

//   get hasTimeSlots(): boolean {
//     return Object.keys(this.newTimeSlotsByDate).length > 0;
//   }

//   // validateForm() {
//   //     this.validationMessage = '';
//   //     this.isFormValid = true;

//   //     const today = new Date();
//   //     const selected = new Date(this.selectedDate);

//   //     // If selected date is today, check start time >= current time
//   //     if (this.selectedDate === this.minDate) {
//   //       const nowTime = today.toTimeString().slice(0, 5); // "HH:mm"
//   //       if (this.startTime && this.startTime < nowTime) {
//   //         this.validationMessage = 'Start time cannot be less than current time for today.';
//   //         this.isFormValid = false;
//   //         return;
//   //       }
//   //     }

//   //     // End time must be greater than start time
//   //     if (this.startTime && this.endTime && this.endTime <= this.startTime) {
//   //       this.validationMessage = 'End time must be greater than start time.';
//   //       this.isFormValid = false;
//   //       return;
//   //     }
//   //   }

//   validateForm() {
//     this.validationMessage = '';
//     this.isFormValid = true;

//     if (!this.selectedDate || !this.startTime || !this.endTime) {
//       this.isFormValid = false;
//       return;
//     }

//     const today = new Date();
//     const selected = new Date(this.selectedDate);

//     if (this.selectedDate === this.minDate) {
//       const nowTime = today.toTimeString().slice(0, 5); // "HH:mm"
//       if (this.startTime < nowTime) {
//         this.validationMessage = 'Start time cannot be less than current time for today.';
//         this.isFormValid = false;
//         return;
//       }
//     }

//     if (this.endTime <= this.startTime) {
//       this.validationMessage = 'End time must be greater than start time.';
//       this.isFormValid = false;
//       return;
//     }
//   }

//   addTimeSlot() {
//     if (!this.selectedDate || !this.startTime || !this.endTime) {
//       alert('Please fill mandatory fields');
//       return;
//     }

//     const date = this.selectedDate;

//     if (this.startTime >= this.endTime) {
//       alert('End time must be after start time.');
//       return;
//     }

//     if (!this.newTimeSlotsByDate[date]) {
//       this.newTimeSlotsByDate[date] = [];
//     }

//     for (let obj of this.newTimeSlotsByDate[date]) {
//       // Check for exact match
//       if (obj.startTime === this.startTime && obj.endTime === this.endTime) {
//         alert('Slot already present');
//         return;
//       }

//       // Check for overlap
//       const existingStart = obj.startTime;
//       const existingEnd = obj.endTime;

//       if (
//         (this.startTime >= existingStart && this.startTime < existingEnd) || // starts during existing slot
//         (this.endTime > existingStart && this.endTime <= existingEnd) || // ends during existing slot
//         (this.startTime <= existingStart && this.endTime >= existingEnd) // completely overlaps existing slot
//       ) {
//         alert('Time slot overlaps with an existing slot');
//         return;
//       }
//     }

//     this.newTimeSlotsByDate[date].push({ startTime: this.startTime, endTime: this.endTime });
//     this.isEdit = false;
//   }

//   saveAvailability() {
//     if (!this.hasTimeSlots && !this.editSlot) return;

//     // this.avaiavailabilityService.saveAvailability(this.newTimeSlotsByDate);
//     if (this.editSlot) {
//       let editData = {
//         id: this.slotData?.id || '',
//         startTime: this.startTime,
//         endTime: this.endTime,
//       };
//       this.availabilityService.editSlot(this.orignalDate, this.selectedDate, editData);
//     } else {
//       console.log("slotDATA--",this.newTimeSlotsByDate)
//       this.availabilityService.addSlot(this.newTimeSlotsByDate);
//     }

//     this.newTimeSlotsByDate = {};
//     this.cancel();
//   }

//   cancel() {
//     this.selectedDate = '';
//     this.startTime = '';
//     this.endTime = '';
//     this.newTimeSlotsByDate = {};
//     this.slotData = null;
//     this.isEdit = false;
//     this.closeModal.emit();
//   }

//   deleteTimeSlot(index: number, date: string) {
//     console.log('index', index, date);
//     console.log(this.newTimeSlotsByDate);

//     this.newTimeSlotsByDate[date].splice(index, 1);
//     if (this.newTimeSlotsByDate[date].length === 0) {
//       delete this.newTimeSlotsByDate[date];
//     }
//   }

//   editTimeSlot(index: number, date: string, startTime: string, endTime: string) {
//     this.selectedDate = date;
//     this.startTime = startTime;
//     this.endTime = endTime;
//     this.isEdit = true;
//     this.deleteTimeSlot(index, date);
//   }
// }
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

  constructor(private availabilityService: Availability, private timeSlotsService: TimeSlots) {}

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    console.log('slotData--', this.slotData);
    if (this.slotData) {
      this.selectedDate = this.formatDate(this.slotData?.date) || '';
      this.startTime = this.formatTime(this.slotData?.startTime) || '';
      this.endTime = this.formatTime(this.slotData?.endTime) || '';
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

  saveAvailability() {
    if (!this.hasTimeSlots && !this.editSlot) return;

    if (this.editSlot) {
      this.newTimeSlotsByDate[this.selectedDate] = [
        { startTime: this.startTime, endTime: this.endTime },
      ];
      const payload = this.buildPayload();
      console.log('Final Payload:', payload);
      // this.createTimeSlot(payload);
      this.timeSlotsService.deleteTimeSlot(this.slotData).subscribe({
        next: (response) => {
          console.log('Slots:', response);
        },
        error: (err) => {
          console.error('Error fetching time slots:', err);
        },
      });
    }
    // } else {
    //   const payload = this.buildPayload();
    //   console.log('Final Payload:', payload);
    //   this.createTimeSlot(payload);
    // }
    const payload = this.buildPayload();
    console.log('Final Payload:', payload);
    this.createTimeSlot(payload);
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

  /** ✅ Converts old structure to new API format */
  private buildPayload() {
    const calendar = Object.keys(this.newTimeSlotsByDate).map((date) => {
      const availableSlots = this.newTimeSlotsByDate[date].map((slot) => {
        return {
          startTime: this.toISO(date, slot.startTime),
          endTime: this.toISO(date, slot.endTime),
        };
      });
      return { date, availableSlots };
    });

    return { calendar };
  }

  /** ✅ Converts date + time to ISO string */
  private toISO(date: string, time: string): string {
    const [hours, minutes] = time.split(':');
    const d = new Date(date);
    d.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return d.toISOString();
  }

  formatDate(isoDate: string): string {
    const dateObj = new Date(isoDate);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // ✅ yyyy-mm-dd
  }

  formatTime(isoDate: string): string {
    const dateObj = new Date(isoDate);
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
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
