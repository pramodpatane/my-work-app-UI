import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UserRolesService {
    baseApiUrl: string = 'https://localhost:44391/api/Auth';

  constructor(private http: HttpClient) {  }

  public async GetUserRolesDropdown() {
    const apiurl = `${this.baseApiUrl}/GetUserDropdown`;
    return this.http.get(apiurl);
  }
}