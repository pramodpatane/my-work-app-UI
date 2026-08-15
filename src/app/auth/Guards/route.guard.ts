import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { MenuService } from '../../core/Services/menu.service';
import { UserStateService } from '../../core/Services/user.state.service';


@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private menuService: MenuService,
    private userState: UserStateService
  ) {}

  // Used if guard is directly applied to a route
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {

    return this.checkPermission(state);
  }

  // Used with canActivateChild
  async canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.checkPermission(state);
  }

  private async checkPermission(
    state: RouterStateSnapshot
  ): Promise<boolean> {

    const userData = this.userState.user();

    const userGuid = userData?.recordId;

    if (!userGuid) {

      await this.router.navigate(['/login']);

      return false;
    }


    try {
      const response$ =
        await this.menuService.GetUserMenus(userGuid);

      const response: any =
        await firstValueFrom(response$);
      //console.log('User Menu Response:', response);

      const menus = Array.isArray(response)
        ? response
        : [];

      const currentUrl =
        this.normalizeUrl(state.url);


      //console.log('Current URL:', currentUrl);

      const hasPermission =
        this.hasMenuPermission(
          menus,
          currentUrl
        );


      //console.log('Has Permission:', hasPermission;
      if (hasPermission) {
        return true;
      }

      await this.router.navigate([
        '/no-access'
      ]);

      return false;

    }
    catch (error) {

      console.error(
        'Route Guard Error:',
        error
      );

      await this.router.navigate([
        '/no-access'
      ]);

      return false;
    }
  }

  private hasMenuPermission(
    menus: any[],
    currentUrl: string
  ): boolean {

    for (const menu of menus) {

      const menuLink =
        this.normalizeUrl(menu?.link);

      if (menuLink === currentUrl) {
        return true;
      }

      if (
        Array.isArray(menu?.children) &&
        menu.children.length > 0
      ) {

        const hasChildPermission =
          menu.children.some(
            (child: any) =>
              this.normalizeUrl(child?.link) === currentUrl
          );

        if (hasChildPermission) {
          return true;
        }
      }
    }
    return false;
  }


  private normalizeUrl(url: string): string {
    if (!url) {
      return '';
    }

    return (
      '/' +
      url
        .replace(/^\/+/, '')
        .split('?')[0]
        .replace(/\/+$/, '')
        .toLowerCase()
    );

  }
}