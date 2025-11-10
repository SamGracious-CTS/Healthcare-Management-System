import { Routes } from '@angular/router';
import { LoginSignupComponent } from './LoginPage/login-signup-component/login-signup-component';
import { DoctorPage } from './doctorPortal/doctor-page/doctor-page';
import { PatientPortal } from './patientPage/patient-portal/patient-portal';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: LoginSignupComponent },
  {
    path: 'doctor-page',
    component: DoctorPage,
    canActivate: [authGuard],
    data: { roles: ['Doctor'] },
  },
  {
    path: 'patient-page',
    component: PatientPortal,
    canActivate: [authGuard],
    data: { roles: ['Patient'] },
  },
];
