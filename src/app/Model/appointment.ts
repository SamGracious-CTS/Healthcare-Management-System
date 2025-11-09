export interface Appointment {

  doctorName: string;
  speciality: string;
  date: string;
  time: string;
  status?: 'Confirmed' | 'Pending'|'Cancelled';
}
export interface Patients extends Appointment {
  id: string;
  doctorId: string;
  name: string;
  gender: string;
  age: number;
  phoneNumber: string;
  endTime?: string;
}


