import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blank-page',
  imports: [],
  templateUrl: './blank-page.html',
  styleUrl: './blank-page.css',
})
export class BlankPage {
  constructor(private router: Router) { }

  goToLogin(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  refreshPage(): void {
    window.location.reload();
  }
}
