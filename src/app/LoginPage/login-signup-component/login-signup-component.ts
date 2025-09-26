import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { CommonModule } from '@angular/common';
import { User } from '../../Model/userType';
import { DoctorService } from '../../services/doctor-service';


@Component({
  selector: 'app-login-signup-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-signup-component.html',
  styleUrl: './login-signup-component.css'
})
export class LoginSignupComponent {
  showSignup = true;
  userType: string = '';
  specialties: string[] = ['Cardiologist', 'Neurologist', 'Dermatologist'];

  constructor(private loginService: LoginService, private router: Router, private doctorService: DoctorService) {}

  switchForm() {
    this.showSignup = !this.showSignup;
  }

  onEmailChange(value: string) {
  if (value.endsWith('@doctor.com')) {
    this.userType = 'Doctor';
  } else if (value.endsWith('@gmail.com')) {
    this.userType = 'Patient';
  } else if (value.endsWith('@admin.com')) {
    this.userType = 'Admin';
  } else {
    this.userType = '';
  }
}


  onSignup(signupForm: NgForm) {
    const { name, mailid, phonenumber, password, confirmPassword, speciality } = signupForm.value;
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (this.userType === 'Doctor' && (!speciality || speciality === '')) {
      alert('Speciality is required for doctors');
      return;
    }
    const user: any = {
      name,
      mailid,
      phonenumber,
      password,
      userType: this.userType
    };
    if (this.userType === 'Doctor') {
      user.speciality = speciality;
      this.doctorService.addDoctor(name, speciality);
    }
    this.loginService.registerUser(user);
    alert('Signup successful!');
    signupForm.reset();
    this.userType = '';
    this.showSignup = false;
  }

 onLogin(loginForm: NgForm) {
  const { mailid, password } = loginForm.value;
  const isValid = this.loginService.validateUser(mailid, password);

  if (!isValid) {
    alert('Invalid credentials');
    return;
  }

  const user = this.loginService.getUser(mailid);
  const name = user?.name;
  let role = '';

  // You can store name in a service or pass via queryParams only
  if (mailid.endsWith('@admin.com')) {
    role = 'Admin';
    this.router.navigate(['/admin-dashboard'], {
      queryParams: { userName: name, role }
    });
  } else if (mailid.endsWith('@doctor.com')) {
    role = 'Doctor';
    this.router.navigate(['/doctor-page'], {
      queryParams: { userName: name, role }
    });
  } else if (mailid.endsWith('@gmail.com')) {
    role = 'Patient';
    this.router.navigate(['/patient-page'], {
      queryParams: { userName: name, role }
    });
  } else {
    alert('Unknown role');
  }
}


}
