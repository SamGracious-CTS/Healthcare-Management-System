import { Injectable } from '@angular/core';
import { User } from '../Model/userType';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private users: User[] = [];

  registerUser(user: User) {
    this.users.push(user);
  }

  validateUser(mailid: string, password: string): boolean {
    return this.users.some(u => u.mailid === mailid && u.password === password);
  }
  
  getUser(mailid: string):User | undefined{
    return this.users.find(name => name.mailid===mailid);
  }
}
