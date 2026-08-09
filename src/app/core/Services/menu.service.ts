import { Injectable } from '@angular/core';
import { MenuItem } from '../Models/menu-items';
import { UserAppMenusApiUrls } from '../ApiUrl\'s/user-app-menus.apiUrls';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  baseUrl: string = 'https://localhost:44391/';
  apiUrl: UserAppMenusApiUrls = new UserAppMenusApiUrls();

  constructor(private http: HttpClient) { }

  public async GetUserMenus(userGuid: string) {
    try {
      const apiurl = `${this.baseUrl}${this.apiUrl.GetUserMenusUrl}`;
      return await this.http.get(apiurl + '(' + userGuid + ')');
    }
    catch (err) {
      throw err;
    }
  }
}