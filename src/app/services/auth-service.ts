import { Injectable } from '@angular/core';
import { BASE_URL } from '../../enviornment/enviornment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private LOGIN_URL = `${BASE_URL}auth/login`;
  private LOGOUT_URL = `${BASE_URL}auth/logout`;
  private SIGNUP_URL = `${BASE_URL}auth/signup`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(this.LOGIN_URL, { email, password });
  }

  signup(userData: {
    name: string;
    age: number;
    gender: string;
    email: string;
    phoneNumber: string;
    password: string;
    userType: string;
    speciality?: string;
  }) {
    return this.http.post<any>(this.SIGNUP_URL, userData);
  }

  // Save token in Session Storage
  saveToken(res:any): void {
    sessionStorage.setItem('token', res.token);
    sessionStorage.setItem('role', res.role);
    if(!res?.data.registrationNumber){
      sessionStorage.setItem('userId', res.data._id);
    }else{
      sessionStorage.setItem('doctorId', res.data.registrationNumber);
    }
  }

  // Get token
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getUserRole(): string | null {
    return sessionStorage.getItem('role');
  }

  getUserId(): string | null {
    return sessionStorage.getItem('userId');
  }

  getDoctorId(): string | null {
    return sessionStorage.getItem('doctorId');
  }

  // Remove token (Logout)
  clearToken(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('doctorId');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

    logout() {
    return this.http.post<any>(this.LOGOUT_URL, {});
  }
}
