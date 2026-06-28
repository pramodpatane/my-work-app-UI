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
          import('./Components/employees/employees')
            .then(m => m.Employees)
      },
      {
        path: 'farmers',
        loadComponent: () =>
          import('../feature/Components/clients/clients')
            .then(m => m.Clients)
      },
      {
        path: 'purchase',
        loadComponent: () =>
          import('../feature/Components/purchase/purchase')
            .then(m => m.Purchase)
      },
      {
        path: 'sales',
        loadComponent: () =>
          import('../feature/Components/sales/sales')
            .then(m => m.Sales)
      },
      {
        path: 'collection',
        loadComponent: () =>
          import('../feature/Components/collection/collection')
            .then(m => m.Collection)
      },
    ]
  }
];
