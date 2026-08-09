import { Routes } from '@angular/router';
import { authGuard } from '../auth/Services/auth.guard';
import { NavbarComponent } from '../core/Components/navbar-component/navbar-component';
import { MenuGuard } from '../auth/Guards/menu.guard';

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
            .then(m => m.Employees),
        //canActivate: [MenuGuard]
      },
      {
        path: 'farmers',
        loadComponent: () =>
          import('../feature/Components/clients/clients')
            .then(m => m.Clients),
        //canActivate: [MenuGuard]
      },
      {
        path: 'purchase',
        loadComponent: () =>
          import('../feature/Components/purchase/purchase')
            .then(m => m.Purchase),
        //canActivate: [MenuGuard]
      },
      {
        path: 'sales',
        loadComponent: () =>
          import('../feature/Components/sales/sales')
            .then(m => m.Sales),
        //canActivate: [MenuGuard]
      },
      {
        path: 'collection',
        loadComponent: () =>
          import('../feature/Components/collection/collection')
            .then(m => m.Collection),
        //canActivate: [MenuGuard]
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('../feature/Components/customers/customers')
            .then(m => m.Customers),
        //canActivate: [MenuGuard]
      },
      {
        path: 'suppliers',
        loadComponent: () =>
          import('../feature/Components/vendors/vendors')
            .then(m => m.Vendors),
        //canActivate: [MenuGuard]
      },
    ]
  }
];
