import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { CommonModule } from '@angular/common';
import { User } from '../../Model/userType';
import { DoctorService } from '../../services/doctor-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login-signup-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-signup-component.html',
  styleUrl: './login-signup-component.css',
})
export class LoginSignupComponent {
  showSignup = true;
  userType: string = '';
  specialties: string[] = ['Cardiologist', 'Neurologist', 'Dermatologist'];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private doctorService: DoctorService,
    private authService: AuthService
  ) {}

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
    const { name, age, gender, mailid, phonenumber, password, confirmPassword, speciality } = signupForm.value;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (this.userType === 'Doctor' && (!speciality || speciality === '')) {
      alert('Speciality is required for doctors');
      return;
    }

    const userData = {
      name,
      age,
      gender,
      email: mailid,
      phoneNumber: phonenumber,
      password,
      userType: this.userType,
      ...(this.userType === 'Doctor' && { speciality })
    };

    this.authService.signup(userData).subscribe({
      next: (res) => {
        alert('Signup successful! Please login.');
        signupForm.reset();
        this.userType = '';
        this.showSignup = false;
      },
      error: (err) => {
        alert(err.error.message || 'Signup failed');
      }
    });
  }

  onLogin(loginForm: NgForm) {
    const { mailid, password } = loginForm.value;

    this.authService.login(mailid, password).subscribe({
      next: (res) => {
        this.authService.saveToken(res);
        const role = res.role;
        const name = res.data?.name;

        if (role === 'Admin') {
          this.router.navigate(['/admin-dashboard'], {
            queryParams: { userName: name, role },
          });
        } else if (role === 'Doctor') {
          this.router.navigate(['/doctor-page'], {
            queryParams: { userName: name, role },
          });
        } else if (role === 'Patient') {
          this.router.navigate(['/patient-page'], {
            queryParams: { userName: name, role },
          });
        } else {
          alert('Unknown role');
        }
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
}
