import { Availability } from './../../../services/availability';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-create-slot',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-slot.html',
  styleUrl: './create-slot.css',
})
export class CreateSlot implements OnInit {
  @Output() closeModal = new EventEmitter();
  // @Output() payload = new EventEmitter<{ timeSlotsByDate: { [date: string]: string[] } }>();
  @Output() newPayload = new EventEmitter<{}>();
  @Input() slotData: { date: string; id:string; startTime: string; endTime: string } | null = null;
  @Input() editSlot:boolean = false
 
  selectedDate: string = '';
  startTime: string = '';
  endTime: string = '';
  minDate: string = '';
  newTimeSlotsByDate: { [date: string]: { startTime: string; endTime: string }[] } = {};
 validationMessage: string = '';
  isFormValid: boolean = false;
  orignalDate:string = ''
 
 
  constructor(private availabilityService: Availability) {}
  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
 
    this.selectedDate = this.slotData?.date || '';
    this.orignalDate = this.selectedDate;
    this.startTime = this.slotData?.startTime || '';
    this.endTime = this.slotData?.endTime || '';
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
 
    const today = new Date();
    const selected = new Date(this.selectedDate);
 
    // If selected date is today, check start time >= current time
    if (this.selectedDate === this.minDate) {
      const nowTime = today.toTimeString().slice(0, 5); // "HH:mm"
      if (this.startTime && this.startTime < nowTime) {
        this.validationMessage = 'Start time cannot be less than current time for today.';
        this.isFormValid = false;
        return;
      }
    }
 
    // End time must be greater than start time
    if (this.startTime && this.endTime && this.endTime <= this.startTime) {
      this.validationMessage = 'End time must be greater than start time.';
      this.isFormValid = false;
      return;
    }
  }
 
 
 
  addTimeSlot() {
    if (!this.selectedDate || !this.startTime || !this.endTime) {
      alert('Please Fill mandatory fields');
      return;
    }
 
    const date = this.selectedDate;
    // const slot = `${this.startTime}-${this.endTime}`;
 
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
 
 
    }
    this.newTimeSlotsByDate[date].push({ startTime: this.startTime, endTime: this.endTime });
  }
 
  saveAvailability() {
    if (!this.hasTimeSlots && !this.editSlot) return;
 
    // this.avaiavailabilityService.saveAvailability(this.newTimeSlotsByDate);
    if(this.editSlot){
      let editData = {
        id: this.slotData?.id||'',
        startTime:this.startTime,
        endTime:this.endTime
      }
      this.availabilityService.editSlot(this.orignalDate,this.selectedDate, editData);
    }else{
      this.availabilityService.addSlot(this.newTimeSlotsByDate);
    }
 
    // this.newPayload.emit(this.newTimeSlotsByDate);
    this.newTimeSlotsByDate = {};
    // console.log('Saving availability:', this.payload);
    this.cancel();
  }
 
  cancel() {
    this.selectedDate = '';
    this.startTime = '';
    this.endTime = '';
    this.newTimeSlotsByDate = {};
    this.slotData = null;
    this.closeModal.emit();
  }
 
  deleteTimeSlot(index: number, date: string) {
    console.log('index', index, date);
    console.log(this.newTimeSlotsByDate);
 
    this.newTimeSlotsByDate[date].splice(index, 1);
    if (this.newTimeSlotsByDate[date].length === 0) {
      delete this.newTimeSlotsByDate[date];
    }
  }
 
  editTimeSlot(index: number, date: string, startTime: string, endTime: string) {
    this.selectedDate = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.deleteTimeSlot(index, date);
  }
}
 
 