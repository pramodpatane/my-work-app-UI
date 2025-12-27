import { Routes } from '@angular/router';
import { authGuard } from '../auth/Services/auth.guard';
import { NavbarComponent } from '../core/Components/navbar-component/navbar-component';

export const Feature_Routes: Routes = [
    {
    path: '',
    component: NavbarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'employees',
        loadComponent: () =>
          import('../feature/Components/employees-component/employees-component')
            .then(m => m.EmployeesComponent)
      },
    ]
  }
];
