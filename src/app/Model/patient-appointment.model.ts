export interface PatientAppointment {
  name: string;
  gender: string;
  age: number;
  phoneNumber: string;
  doctorName: string;
  speciality: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}
