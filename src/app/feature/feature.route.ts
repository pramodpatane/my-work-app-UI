import { Routes } from '@angular/router';

import { authGuard } from '../auth/Guards/auth.guard';
import { RouteGuard } from '../auth/Guards/route.guard';
import { NavbarComponent } from '../core/Components/navbar-component/navbar-component';

export const Feature_Routes: Routes = [

  {
    path: '',
    component: NavbarComponent,

    canActivate: [authGuard],

    canActivateChild: [RouteGuard],

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
          import('./Components/clients/clients')
            .then(m => m.Clients)
      },

      {
        path: 'purchase',
        loadComponent: () =>
          import('./Components/purchase/purchase')
            .then(m => m.Purchase)
      },

      {
        path: 'sales',
        loadComponent: () =>
          import('./Components/sales/sales')
            .then(m => m.Sales)
      },

      {
        path: 'collection',
        loadComponent: () =>
          import('./Components/collection/collection')
            .then(m => m.Collection)
      },

      {
        path: 'customers',
        loadComponent: () =>
          import('./Components/customers/customers')
            .then(m => m.Customers)
      },

      {
        path: 'suppliers',
        loadComponent: () =>
          import('./Components/vendors/vendors')
            .then(m => m.Vendors)
      }

    ]
  }

];