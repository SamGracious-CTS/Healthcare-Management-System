export interface Patient {
  id: string;
  name: string;
  age: number;
  phoneNumber: string;
}

export interface ConsultationRecord {
  consultationId: string;
  patientId: string;
  patientName: string;
  date: string;
  notes: string;
  prescription: string;
}
