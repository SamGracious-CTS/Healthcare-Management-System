import { Injectable } from '@angular/core';
import { BASE_URL } from '../../enviornment/enviornment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private LOGIN_URL = `${BASE_URL}auth/login`;
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(this.LOGIN_URL, { email, password });
  }

  // Save token in Local Storage
  saveToken(res:any): void {
    // localStorage.setItem('token', token);
    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.role);
    if(!res?.data.registrationNumber){
      localStorage.setItem('userId', res.data._id);
    }else{
      localStorage.setItem('doctorId', res.data.registrationNumber);
    }
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

   getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  // Remove token (Logout)
  clearToken(): void {
    localStorage.removeItem('token');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
