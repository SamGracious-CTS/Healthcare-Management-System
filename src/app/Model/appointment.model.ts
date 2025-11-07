import { Patient } from './patient.model';

export interface Appointment {

  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'completed' | 'canceled';
  consultationId?: string;

  doctorName?: string;
  speciality?: string;
  patientName?: string;

}

export interface PatientWithAppointment {
  patient: Patient;
  appointment: Appointment;
}
