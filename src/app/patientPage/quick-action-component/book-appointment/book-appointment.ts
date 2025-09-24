import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
//import {  Appointment, Patients } from '../../Model/appointment';
import { Appointment, Patients } from '../../../Model/appointment';

//import { AppointmentService } from '../../services/appointment-service';
import { AppointmentService } from '../../../services/appointment-service';
declare var bootstrap: any;

@Component({
  selector: 'app-book-appointment',
  imports: [FormsModule,CommonModule],
  templateUrl: './book-appointment.html',
  styleUrl: './book-appointment.css',
 
})
export class BookAppointment {

apptform: any;
constructor(private appointmentService:AppointmentService){}
 
  patient:Patients={
  name:'',
  gender:'',
  age:0,
  phoneNumber:'',
  doctorName:'',
  speciality:'',
  date:'',
  time:'',
  status:'Confirmed'
 };
 specialties = ['Cardiologist', 'Neurologist', 'Dermatologist'];
 
  doctorMap: { [key: string]: string[] } = {
    Cardiologist: ['Navya', 'sam', 'sohit'],
    Neurologist: ['Rasgna', 'vikas'],
    Dermatologist: ['Preethi', 'krishna', 'robin']
  };
 
  availableDoctors: string[] = [];
 
  onSpecialtyChange(): void {
    this.availableDoctors = this.doctorMap[this.patient.speciality] || [];
    this.patient.doctorName = '';
  }
 
timeSlots:string[]=[]
showSlots=false
form:any
 
 onDateChange(){
  this.showSlots=true;
  this.timeSlots = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']
 }
 selectSlot(slot:string){
  this.patient.time=slot
 
 }
todayString = new Date().toISOString().split('T')[0];
 
 submit=false
bookAppointment(form:NgForm){
if(form.valid){
    this.appointmentService.bookedAppointment(this.patient);
    this.submit=true;
    this.patient.time = '';
    this.showSlots = false;
   
    form.resetForm();
 }
 else{
  this.submit=false;
 }
}

  
    
}
