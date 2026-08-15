import { Routes } from '@angular/router';
import { NavbarComponent } from './Components/navbar-component/navbar-component';
import { authGuard } from '../auth/Guards/auth.guard';
import { RoleGuard } from '../auth/Guards/role.guard';

export const Core_Routes: Routes = [
    {
    path: '',
    component: NavbarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../core/Components/dashboard-component/dashboard-component')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'users',
        loadComponent: () =>
          import('../core/Components/users-component/users-component')
            .then(m => m.UsersComponent),
          canActivate: [RoleGuard],
          data: {
            roles: ['SuperAdmin']
          }
      },
      {
        path: 'no-access',
        loadComponent: () =>
          import('../core/Components/blank-page/blank-page')
            .then(m => m.BlankPage)
      },
    ]
  }
];
