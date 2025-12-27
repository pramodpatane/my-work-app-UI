import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  userName = 'User';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('UserData');
    if (userData) {
      this.userName = JSON.parse(userData).userName || 'User';
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
