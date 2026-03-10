import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  userName = 'User';
  userRole = "";

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('UserData');
    if (userData) {
      this.userName = JSON.parse(userData).userName || 'User';
      this.userRole = JSON.parse(userData).roleName || 'User';
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
