import { Patient } from './patient.model';

export interface Appointment {

  id: string;
  patientId: string;
  doctorId: string;
  date: string;
   doctorName?: string;
  speciality?: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'completed' | 'canceled';
  consultationId?: string;

 
  patientName?: string;

}

export interface PatientWithAppointment {
  patient: Patient;
  appointment: Appointment;
}
