import { Injectable } from '@angular/core';
import { MenuItem } from '../Models/menu-items';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  getMenus(): MenuItem[] {
    return [
      {
        title: 'Dashboard',
        icon: 'bi bi-speedometer2',
        link: '/dashboard'
      },
      {
        title: 'Employees',
        icon: 'bi bi-person-badge',
        link: '/employees'
      },
      {
        title: 'Farmers',
        icon: 'bi bi-person',
        link: '/farmers'
      },
      {
        title: 'Masters',
        icon: 'bi bi-database',
        expanded: false,
        children: [
          {
            title: 'Customers',
            icon: 'bi bi-people',
            link: '/customers'
          },
          {
            title: 'Suppliers',
            icon: 'bi bi-truck',
            link: '/suppliers'
          }
        ]
      },
      {
        title: 'Milk Collection',
        icon: 'bi bi-droplet-fill',
        link: '/milk-collection'
      },
      {
        title: 'Purchase',
        icon: 'bi bi-cart-fill',
        link: '/purchase'
      },
      {
        title: 'Sales',
        icon: 'bi bi-receipt',
        link: '/sales'
      },
      {
        title: 'Reports',
        icon: 'bi bi-file-earmark-bar-graph',
        link: '/reports'
      }
    ];
  }
}