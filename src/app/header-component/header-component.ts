import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
//import { CommonModule } from "../../../node_modules/@angular/common/common_module.d";

@Component({
  selector: 'app-header-component',
  imports: [CommonModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  role = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userName = sessionStorage.getItem('userName') || '';
      this.role = sessionStorage.getItem('role') || '';
    });
  }
  logout() {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout successful:', response);
        // Clear session storage
        sessionStorage.clear();
        // Redirect to login or home page
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
        alert('Logout failed. Please try again.');
      },
    });
  }
}
