import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from '../../Models/menu-items';
import { MenuService } from '../../Services/menu.service';
import { MatIconModule } from '@angular/material/icon';
import { A11yModule } from "@angular/cdk/a11y";

@Component({
  selector: 'app-navbar-component',
  imports: [RouterModule, CommonModule, MatIconModule, A11yModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  userName = 'User';
  userRole = "";
  menus: MenuItem[] = [];
  isCollapsed = false;
  isMobileMenuOpen = false;
  openMenu: string = '';
  logoUrl: string = "../../../assets/DMS Logo.png";

  constructor(private router: Router, private menuService: MenuService) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('UserData');
    if (userData) {
      this.userName = JSON.parse(userData).userName || 'User';
      this.userRole = JSON.parse(userData).roleName || 'User';
    }

    this.menus = this.menuService.getMenus();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  toggleMenu(selectedMenu: any) {
    this.menus.forEach(menu => {
      if (menu !== selectedMenu && menu.children) {
        menu.expanded = false;
      }
    });

    selectedMenu.expanded = !selectedMenu.expanded;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768) {
      this.isMobileMenuOpen = false;
    }
  }
}
