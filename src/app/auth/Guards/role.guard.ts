import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { UserStateService } from '../../core/Services/user.state.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  userRole = "User";
  constructor(private auth: AuthService, private router: Router, private userState: UserStateService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.userState.user();
    if (user) {
      this.userRole = user.roleName || 'User';
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
