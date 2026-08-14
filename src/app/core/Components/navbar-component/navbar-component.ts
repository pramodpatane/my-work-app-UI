import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from '../../Models/menu-items';
import { MenuService } from '../../Services/menu.service';
import { MatIconModule } from '@angular/material/icon';
import { A11yModule } from "@angular/cdk/a11y";
import { SwalService } from '../../../global/swal.service';
import { UserStateService } from '../../Services/user.state.service';

@Component({
  selector: 'app-navbar-component',
  imports: [RouterModule, CommonModule, MatIconModule, A11yModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  userName = 'User';
  userRole = "";
  userGuid = "";
  appMenus: MenuItem[] = [];
  isCollapsed = false;
  isMobileMenuOpen = false;
  openMenu: string = '';
  logoUrl: string = "../../../assets/DMS Logo.png";

  constructor(private router: Router, private swalservice: SwalService, private userStateService: UserStateService,
    private menuService: MenuService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('UserData');
    //const userData = this.userStateService.user$.subscribe(user => { });    
    if (userData) {
      this.userName = JSON.parse(userData).userName || 'User';
      this.userRole = JSON.parse(userData).roleName || 'User';
      this.userGuid = JSON.parse(userData).recordId || '';
    }
    this.GetUserAppMenus();
  }

  public async GetUserAppMenus() {
    try{
       (await this.menuService.GetUserMenus(this.userGuid)).subscribe({
          next: (res) => {            
            let response = JSON.parse(JSON.stringify(res));
            this.appMenus = response;
            //console.log( this.appMenus)
            this.cdr.detectChanges();
          },
          error: () => {
            this.swalservice.ShowAlert("error", "");
          }
        });
      //} ✅
    }
    catch(err) {
      throw err;
    }
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
    this.appMenus.forEach(menu => {
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
    if (window.innerWidth > 390) {
      this.isMobileMenuOpen = false;
    }
  }
}
