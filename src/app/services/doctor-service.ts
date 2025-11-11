import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private doctors: { [speciality: string]: string[] } = {};

  constructor() {}

  addDoctor(name: string, speciality: string) {
    if (!this.doctors[speciality]) this.doctors[speciality] = [];
    if (!this.doctors[speciality].includes(name)) {
      this.doctors[speciality].push(name);
    }
  }

  getDoctors() {
    return { ...this.doctors };
  }
}
