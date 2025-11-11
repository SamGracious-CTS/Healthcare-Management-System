import { Injectable } from '@angular/core';
import { User } from '../Model/userType';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private users: User[] = [];

  registerUser(user: User): boolean {
    const exists = this.users.some(u => u.mailid === user.mailid);
    if (exists) return false;
    this.users.push(user);
    return true;
  }

  validateUser(mailid: string, password: string): boolean {
    const user = this.users.find(u => u.mailid === mailid);
    return user ? user.password === password : false;
  }

  getUser(mailid: string): User | undefined {
    return this.users.find(u => u.mailid === mailid);
  }
}
