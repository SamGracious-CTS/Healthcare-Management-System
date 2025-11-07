export interface Patient {
  id: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  emailId: string;
  phoneNumber: string;
}

export interface ConsultationRecord {
  consultationId: string;
  doctorId: string;
  patientId: string;
  patientName?: string;
  appointmentId: string;
  notes: string;
  prescription: string;
  date?: string; 
  createdAt?: string;
  updatedAt?: string;
}
