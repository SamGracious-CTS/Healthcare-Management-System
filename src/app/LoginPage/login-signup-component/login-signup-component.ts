import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { CommonModule } from '@angular/common';
import { User } from '../../Model/userType';


@Component({
  selector: 'app-login-signup-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-signup-component.html',
  styleUrl: './login-signup-component.css'
})
export class LoginSignupComponent {

  showSignup = true;

  constructor(private loginService: LoginService, private router: Router) {}

  switchForm() {
    this.showSignup = !this.showSignup;
  }

  onSignup(signupForm: NgForm) {
    const { name, mailid, phonenumber, password, confirmPassword } = signupForm.value;
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const user: User = {
      name,
      mailid,
      password
    }


    this.loginService.registerUser(user);
    alert('Signup successful!');
    signupForm.reset();
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
    let role = ''

    if (mailid.endsWith('@admin.com')) {
      role = 'Admin'
      this.router.navigate(['/admin-dashboard'],{
      queryParams: {userName: name, role}
      });
      
      
    } else if (mailid.endsWith('@doctor.com')) {
      role = 'Doctor'
      this.router.navigate(['/doctor-page'], {
              queryParams: {userName: name, role}
      });
    } else if (mailid.endsWith('@gmail.com')) {
      role = 'Patient'
      this.router.navigate(['/patient-page'], {
              queryParams: {userName: name, role}
      });
    } else {
      alert('Unknown role');
    }
  }

}
