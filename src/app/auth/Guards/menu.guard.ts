import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { firstValueFrom, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { MenuService } from '../../core/Services/menu.service';

@Injectable({
  providedIn: 'root'
})
export class MenuGuard implements CanActivate {

  constructor(
    private router: Router,
    private menuService: MenuService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {

    const userData = JSON.parse(
      localStorage.getItem('UserData') || '{}'
    );

    const userGuid = userData?.UserGuid;

    if (!userGuid) {
      this.router.navigate(['/login']);
      return false;
    }

    return firstValueFrom((await this.menuService.GetUserMenus(userGuid)).pipe(

      map((res: any) => {

        const menus = res || [];

        const currentUrl = state.url
          .split('?')[0]
          .toLowerCase()
          .replace(/\/$/, '');

        const hasPermission = menus.some((menu: any) => {

          const menuRoute = (menu.Route || '')
            .toLowerCase()
            .replace(/\/$/, '');

          return menuRoute === currentUrl;
        });

        if (hasPermission) {
          return true;
        }

        this.router.navigate(['/no-access']);
        return false;
      }),

      catchError((error) => {

        console.error('Error while getting user menus:', error);

        this.router.navigate(['/no-access']);

        return of(false);
      })
    ));
  }
}