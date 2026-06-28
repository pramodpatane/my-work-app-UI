import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  userRole = "User";
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
   const userData = localStorage.getItem('UserData');
    if (userData) {
      this.userRole = JSON.parse(userData).roleName || 'User';
    }

    const expectedRoles = route.data['roles'] as string[];

    if (expectedRoles.includes(this.userRole)) {
      return true;
    }

    if (!this.auth.hasAnyRole(expectedRoles)) {
      this.router.navigate(['/not-authorized']);
      return false;
    }

    return true;
  }
}
