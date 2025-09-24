export interface Appointment {
 
  doctorName: string;
  speciality: string;
  date: string;
  time: string;
  status?: 'Confirmed' | 'Pending'|'Cancelled';
}
export interface Patients extends Appointment{
  name:String,
  gender:string,
  age:number,
  phoneNumber:string,
  // doctorName:string,
  // speciality:string,
  // date:string,
  // time:string,
   
}